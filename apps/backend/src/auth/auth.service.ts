import { ActivityService } from '@/src/activity/activity.service'
import type { EnvConfig } from '@/src/utils/config/env-config'
import { HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Activities, Role, type User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { authErrors, globalErrors } from 'global/errors'
import { OAuth2Client } from 'google-auth-library'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { UserService } from '../user/user.service'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import type { AuthDto, GoogleAuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	private google: OAuth2Client

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly usersService: UserService,
		private readonly configService: ConfigService<EnvConfig>,
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
		await this.checkUserExistBeforeCreate(dto.email)

		const popularGenres = await this.getPopular()
		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password),
				selectedGenres: {
					connect: popularGenres.map(genre => ({
						slug: genre.slug
					}))
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

	async googleSign(dto: GoogleAuthDto) {
		const ticket = await this.google
			.verifyIdToken({
				idToken: dto.socialId,
				audience: [this.configService.getOrThrow('GOOGLE_CLIENT_ID')]
			})
			.catch(() => {
				throw serverError(HttpStatus.BAD_REQUEST, authErrors.invalidGoogleToken)
			})

		const data = ticket.getPayload()
		if (!data?.sub)
			throw serverError(HttpStatus.BAD_REQUEST, authErrors.invalidGoogleToken)

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
			throw serverError(HttpStatus.BAD_REQUEST, authErrors.invalidGoogleToken)
		await this.checkUserExistBeforeCreate(data.email)
		const popularGenres = await this.getPopular()
		const newUser = await this.prisma.user.create({
			data: {
				email: data.email,
				socialId: data.sub,
				selectedGenres: {
					connect: popularGenres.map(genre => ({
						slug: genre.slug
					}))
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
		const result: { id: number } = await this.jwt
			.verifyAsync(refreshToken)
			.catch(error => {
				throw serverError(HttpStatus.BAD_REQUEST, error.message)
			})
		if (!result)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.invalidValue)
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
	private async checkUserExistBeforeCreate(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email
			}
		})
		if (user) throw serverError(HttpStatus.BAD_REQUEST, authErrors.userExist)
	}

	private issueToken(userId: number) {
		const data = { id: userId }
		return {
			accessToken: this.jwt.sign(data, {
				expiresIn:
					this.configService.get('NODE_ENV') === 'development' ? '10s' : '15m'
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
			throw serverError(
				HttpStatus.BAD_REQUEST,
				authErrors.passwordOrEmailInvalid
			)
		const isPasswordValid = await verify(user.password, dto.password)
		if (!isPasswordValid)
			throw serverError(
				HttpStatus.BAD_REQUEST,
				authErrors.passwordOrEmailInvalid
			)

		return user
	}

	async getPopular() {
		return this.prisma.genre.findMany({
			take: 3,
			select: ReturnGenreObject,
			orderBy: {
				activities: {
					_count: 'asc'
				}
			}
		})
	}

	private userFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			role: user.role
		}
	}
}
