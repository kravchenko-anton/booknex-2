import { Test } from '@nestjs/testing'
import { UserService } from '../user/user.service'
import { PrismaService } from '../utils/services/prisma.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
	let authService: AuthService
	let prismaService: PrismaService

	beforeEach(async () => {
		const moduleReference = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: PrismaService, useValue: {} },
				{ provide: UserService, useValue: {} }
			]
		}).compile()

		authService = moduleReference.get<AuthService>(AuthService)
		prismaService = moduleReference.get<PrismaService>(PrismaService)
	})

	it('should be defined', () => {
		expect(authService).toBeDefined()
	})

	describe('login', () => {
		it('should return a user and tokens', async () => {
			const dto = { email: 'test@test.com', password: 'password' }
			const user = {
				id: 1,
				email: dto.email,
				password: dto.password,
				role: 'user' as const
			}
			const tokens = { accessToken: 'access', refreshToken: 'refresh' }

			jest.spyOn(authService, 'validateUser').mockResolvedValue(user)
			jest.spyOn(authService, 'issueToken').mockReturnValue(tokens)

			expect(await authService.login(dto)).toEqual({ user, ...tokens })
		})
	})

	describe('register', () => {
		it('should return a user and tokens', async () => {
			const dto = { email: 'test@test.com', password: 'password' }
			const user = {
				id: 1,
				email: dto.email,
				password: dto.password,
				role: 'user' as const,
				goalMinutes: 10,
				authType: 'email' as const
			}
			const tokens = { accessToken: 'access', refreshToken: 'refresh' }

			jest.spyOn(authService, 'checkEmailExist').mockResolvedValue()
			jest.spyOn(authService, 'getPopular').mockResolvedValue([])
			jest.spyOn(prismaService.user, 'create').mockResolvedValue(user as any)
			jest.spyOn(authService, 'issueToken').mockReturnValue(tokens)

			expect(await authService.register(dto)).toEqual({ user, ...tokens })
		})
	})
})
