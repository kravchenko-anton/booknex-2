import { HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Activities, Role, type User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { OAuth2Client } from 'google-auth-library'
import { ActivityService } from '../activity/activity.service'
import { UserService } from '../user/user.service'
import { serverError } from '../utils/call-error'
import { AuthErrors, GlobalErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import type { AuthDto, SignDto } from './dto/auth.dto'

export type RoleType = keyof typeof Role

@Injectable()
export class AuthService {
	private google: OAuth2Client
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly usersService: UserService,
		private readonly configService: ConfigService,
		private readonly activityService: ActivityService
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
				email: dto.email
			}
		})
		if (oldUser)
			throw serverError(
				HttpStatus.BAD_REQUEST,
				AuthErrors.passwordOrEmailInvalid
			)

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

		await this.activityService.create({
			type: Activities.registerNewUser,
			importance: 1,
			userId: user.id
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
		if (!data?.sub)
			throw serverError(HttpStatus.BAD_REQUEST, AuthErrors.invalidGoogleToken)

		const user = await this.prisma.user.findUnique({
			where: {
				socialId: data?.sub
			}
		})
		if (user) {
			console.log('User exist and i just logged in')
			const tokens = this.issueToken(user.id)

			await this.activityService.create({
				type: Activities.loginUser,
				importance: 1,
				userId: user.id
			})

			return {
				type: 'login',
				user: this.userFields(user),
				...tokens
			}
		}

		if (!data?.email)
			throw serverError(HttpStatus.BAD_REQUEST, 'Invalid google token')
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: data.email
			}
		})
		if (oldUser)
			throw serverError(
				HttpStatus.BAD_REQUEST,
				AuthErrors.passwordOrEmailInvalid
			)

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
				role: Role.user,
				fullName:
					data.given_name && data.family_name
						? `${data.given_name} ${data.family_name}`
						: data?.email?.split('@')[0],
				picture: data.picture || 'fallback.png',
				location: data.locale || 'unknown'
			}
		})

		const newTokens = this.issueToken(newUser.id)
		await this.activityService.create({
			type: Activities.registerNewUser,
			importance: 1,
			userId: newUser.id
		})
		return {
			type: 'register',
			user: this.userFields(newUser),
			...newTokens
		}
	}

	async refresh(refreshToken: string) {
		const result: { id: number } = await this.jwt.verifyAsync(refreshToken)
		if (!result)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.invalidValue)
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
				//TODO: когда перейдем на продакшн поменять на 15m
				expiresIn: '10s'
			}),
			refreshToken: this.jwt.sign(data, {
				expiresIn: '10d'
			})
		}
	}
	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (!user?.password)
			throw serverError(HttpStatus.NOT_FOUND, AuthErrors.passwordOrEmailInvalid)
		const isPasswordValid = await verify(user.password, dto.password)
		if (!isPasswordValid)
			throw serverError(HttpStatus.NOT_FOUND, AuthErrors.passwordOrEmailInvalid)

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
