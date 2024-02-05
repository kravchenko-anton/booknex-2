import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import type { User } from '@prisma/client'
import { OAuth2Client } from 'google-auth-library'
import { UserService } from '../user/user.service'
import { ActivityEnum } from '../user/user.types'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import type { SignDto } from './dto/auth.dto'

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

	//google sign in
	async sign(dto: SignDto) {
		const ticket = await this.google.verifyIdToken({
			idToken: dto.socialId,
			audience: [this.configService.getOrThrow('GOOGLE_CLIENT_ID')]
		})

		const data = ticket.getPayload()

		if (!data) {
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
				socialId: data.sub
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
				}
			}
		})

		const tokens = this.issueToken(newUser.id)
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
			...tokens
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
				expiresIn: '1m'
			}),
			refreshToken: this.jwt.sign(data, {
				expiresIn: '10d'
			})
		}
	}

	private userFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			role: user.role
		}
	}
}
