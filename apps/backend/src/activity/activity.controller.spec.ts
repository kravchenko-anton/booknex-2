import { Test } from '@nestjs/testing'
import { Activities } from '@prisma/client'
import { ActivityController } from './activity.controller'
import { ActivityService } from './activity.service'

describe('ActivityController', () => {
	let activityController: ActivityController
	let activityService: ActivityService

	beforeEach(async () => {
		const moduleReference = await Test.createTestingModule({
			controllers: [ActivityController],
			providers: [
				{
					provide: ActivityService,
					useValue: {
						create: jest.fn()
					}
				}
			]
		}).compile()

		activityService = moduleReference.get<ActivityService>(ActivityService)
		activityController =
			moduleReference.get<ActivityController>(ActivityController)
	})

	it('should be defined', () => {
		expect(activityController).toBeDefined()
	})

	describe('create', () => {
		it('should return the created activity', async () => {
			const activity = {
				type: Activities.visitBook,
				importance: 2,
				userId: 1,
				bookId: 2,
				genreId: 3,
				genreSlug: 'fantasy',
				bookSlug: 'the-hobbit'
			}

			jest.spyOn(activityService, 'create').mockResolvedValue(activity as any)

			const result = await activityService.create(activity)

			expect(result).toBe(activity)
		})
	})
})
