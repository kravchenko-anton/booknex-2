import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import type { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { OAuth2Client } from 'google-auth-library'
import { UserService } from '../user/user.service'
import { ActivityEnum } from '../user/user.types'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import type { AuthDto, SignDto } from './dto/auth.dto'

export enum RoleEnum {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export type RoleType = keyof typeof RoleEnum

@Injectable()
export class AuthService {
	private google: OAuth2Client
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly usersService: UserService,
		private readonly configService: ConfigService
	) {
		this.google = new OAuth2Client(
			configService.get('GOOGLE_CLIENT_ID'),
			configService.get('GOOGLE_CLIENT_SECRET')
		)
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = this.issueToken(user.id)

		return {
			user: this.userFields(user),
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
				socialId: null
			}
		})
		if (oldUser)
			throw new BadRequestException(
				`User ${ErrorsEnum.Already_Exist}`
			).getResponse()

		const mostPopularGenres = await this.prisma.genre.findMany({
			take: 3,
			select: {
				id: true
			}
		})
		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password),
				selectedGenres: {
					connect: mostPopularGenres
				}
			}
		})
		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Register_New_User,
				importance: 1,
				user: {
					connect: {
						id: user.id
					}
				}
			}
		})
		const tokens = this.issueToken(user.id)
		return {
			user: this.userFields(user),
			...tokens
		}
	}

	async googleSign(dto: SignDto) {
		const ticket = await this.google.verifyIdToken({
			idToken: dto.socialId,
			audience: [this.configService.getOrThrow('GOOGLE_CLIENT_ID')]
		})

		const data = ticket.getPayload()
		if (!data.email) {
			throw new HttpException(
				{
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					errors: {
						user: 'wrongToken'
					}
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			)
		}

		const user = await this.prisma.user.findUnique({
			where: {
				socialId: data.sub,
				password: null
			}
		})
		if (user) {
			console.log('User exist and i just logged in')
			const tokens = this.issueToken(user.id)
			await this.prisma.activity.create({
				data: {
					importance: 1,
					type: ActivityEnum.Login_User,
					user: {
						connect: {
							id: user.id
						}
					}
				}
			})
			return {
				user: this.userFields(user),
				...tokens
			}
		}

		console.log('User does not exist and i just registered it')
		const mostPopularGenres = await this.prisma.genre.findMany({
			take: 3,
			select: {
				id: true
			}
		})

		const newUser = await this.prisma.user.create({
			data: {
				email: data.email,
				socialId: data.sub,
				selectedGenres: {
					connect: mostPopularGenres
				},
				role: 'USER',
				fullName:
					data.given_name && data.family_name
						? `${data.given_name} ${data.family_name}`
						: data.email.split('@')[0],
				picture: data.picture || 'fallback.png',
				location: data.locale || 'unknown'
			}
		})

		const newTokens = this.issueToken(newUser.id)
		await this.prisma.activity.create({
			data: {
				importance: 1,
				type: ActivityEnum.Login_User,
				user: {
					connect: {
						id: newUser.id
					}
				}
			}
		})
		return {
			user: this.userFields(newUser),
			...newTokens
		}
	}

	async refresh(refreshToken: string) {
		const result: { id: number } = await this.jwt.verifyAsync(refreshToken)
		if (!result)
			throw new BadRequestException(ErrorsEnum.Invalid_Value).getResponse()
		const user = await this.usersService.getUserById(result.id, {
			email: true,
			id: true
		})

		const tokens = this.issueToken(user.id)
		return {
			user,
			...tokens
		}
	}

	private issueToken(userId: number) {
		const data = { id: userId }
		return {
			accessToken: this.jwt.sign(data, {
				expiresIn: '1h'
			}),
			refreshToken: this.jwt.sign(data, {
				expiresIn: '10d'
			})
		}
	}
	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findFirst({
			where: {
				email: dto.email,
				socialId: null
			}
		})
		if (!user?.password)
			throw new NotFoundException(
				"Email or password doesn't work"
			).getResponse()
		const isPasswordValid = await verify(user.password, dto.password)
		if (!isPasswordValid)
			throw new BadRequestException(
				"Email or password doesn't work"
			).getResponse()

		return user
	}

	private userFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			role: user.role
		}
	}
}
