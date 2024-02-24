import { z } from 'zod'

export const ActivitiesSchema = z.enum([
	'startedReading',
	'finishedReading',
	'savedBook',
	'removeFromSaved',
	'checkCatalog',
	'reviewBook',
	'visitBook',
	'createBook',
	'updateBook',
	'visitGenre',
	'visitCollection',
	'getEbook',
	'updateRecommendations',
	'registerNewUser',
	'loginUser'
])

export const ActivitySchema = z.object({
	type: ActivitiesSchema,
	id: z.number().int(),
	createdAt: z.coerce.date(),
	genreId: z.number().int().nullable(),
	bookId: z.number().int().nullable(),
	userId: z.number().int().nullable(),
	importance: z.number().int()
})
//TODO: сделать тут тип чтобы можно было использовать
