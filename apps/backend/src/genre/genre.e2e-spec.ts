import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { GenreModule } from './genre.module'
import { GenreService } from './genre.service'

describe('Cats', () => {
	let app: INestApplication
	const genreService = { findAll: () => ['test'] }

	beforeAll(async () => {
		const moduleReference = await Test.createTestingModule({
			imports: [GenreModule]
		})
			.overrideProvider(GenreService)
			.useValue(genreService)
			.compile()

		app = moduleReference.createNestApplication()
		await app.init()
	})

	it(`/GET genre`, () =>
		request(app.getHttpServer()).get('/').expect(200).expect({
			data: genreService.findAll()
		}))

	afterAll(async () => {
		await app.close()
	})
})
