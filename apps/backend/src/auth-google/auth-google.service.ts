import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import type { Session, User } from '@prisma/client'
import { OAuth2Client } from 'google-auth-library'
import { PrismaService } from '../utils/prisma.service'
import type { NullableType } from '../utils/types/nullable.type'
import type { AuthGoogleLoginDto } from './dto/auth-google-login.dto'

export interface SocialInterface {
	id: string
	firstName?: string
	lastName?: string
	email?: string
}

export interface JwtRefreshPayloadType {
	sessionId: Session['id']
	iat: number
	exp: number
}

export type LoginResponseType = Readonly<{
	token: string
	refreshToken: string
	tokenExpires: number
	user: User
}>

@Injectable()
export class AuthGoogleService {
	private google: OAuth2Client

	constructor(
		private jwtService: JwtService,
		private readonly prisma: PrismaService,
		private configService: ConfigService
	) {
		this.google = new OAuth2Client(
			configService.get('GOOGLE_CLIENT_ID'),
			configService.get('GOOGLE_CLIENT_SECRET')
		)
	}

	async validateSocialLogin(socialData: SocialInterface) {
		let user: NullableType<User> = null
		const socialEmail = socialData.email?.toLowerCase()
		let userByEmail: NullableType<User> = null

		if (socialEmail) {
			userByEmail = await this.prisma.user.findFirst({
				where: {
					email: socialEmail
				}
			})
		}

		if (socialData.id) {
			user = await this.prisma.user.findFirst({
				where: {
					socialId: socialData.id
				}
			})
		}

		if (user) {
			if (socialEmail && !userByEmail) {
				user.email = socialEmail
			}
			await this.prisma.user.update({
				where: {
					id: user.id
				},
				data: user
			})
		} else if (userByEmail) {
			user = userByEmail
		} else {
			await this.prisma.user.create({
				data: {
					email: socialEmail ?? null,
					socialId: socialData.id,
					role: 'USER'
				}
			})
			user = await this.prisma.user.findFirst({
				where: {
					socialId: socialData.id
				}
			})
		}

		if (!user) {
			throw new HttpException(
				{
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					errors: {
						user: 'userNotFound'
					}
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			)
		}

		const session = await this.prisma.session.create({
			data: {
				userId: user.id
			}
		})

		const {
			token: jwtToken,
			refreshToken,
			tokenExpires
		} = await this.getTokensData({
			id: user.id,
			role: user.role,
			sessionId: session.id
		})

		return {
			refreshToken,
			token: jwtToken,
			tokenExpires,
			user
		}
	}

	async getProfileByToken(
		loginDto: AuthGoogleLoginDto
	): Promise<SocialInterface> {
		const ticket = await this.google.verifyIdToken({
			idToken: loginDto.idToken,
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

		return {
			id: data.sub,
			email: data.email,
			firstName: data.given_name,
			lastName: data.family_name
		}
	}
	async refreshToken(
		data: Pick<JwtRefreshPayloadType, 'sessionId'>
	): Promise<Omit<LoginResponseType, 'user'>> {
		const session = await this.prisma.session.findFirst({
			include: {
				user: {
					select: {
						role: true,
						id: true
					}
				}
			},
			where: {
				id: data.sessionId
			}
		})

		if (!session) {
			throw new UnauthorizedException()
		}

		const { token, refreshToken, tokenExpires } = await this.getTokensData({
			id: session.user.id,
			role: session.user.role,
			sessionId: session.id
		})

		return {
			token,
			refreshToken,
			tokenExpires
		}
	}

	private async getTokensData(data: {
		id: User['id']
		role: User['role']
		sessionId: Session['id']
	}) {
		const tokenExpires = Date.now() * 1000 + 1000 * 60 * 60 * 24 * 7

		const [token, refreshToken] = await Promise.all([
			await this.jwtService.signAsync(
				{
					id: data.id,
					role: data.role,
					sessionId: data.sessionId
				},
				{
					secret: this.configService.getOrThrow('AUTH_SECRET'),
					expiresIn: '7d'
				}
			),
			await this.jwtService.signAsync(
				{
					sessionId: data.sessionId
				},
				{
					secret: this.configService.getOrThrow('AUTH_REFRESH_SECRET'),
					expiresIn: this.configService.getOrThrow('AUTH_REFRESH_EXPIRES')
				}
			)
		])

		return {
			token,
			refreshToken,
			tokenExpires
		}
	}
}
