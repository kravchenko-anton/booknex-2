// Promise<{id: number, createdAt: Date, type: string, text: string, book: {picture: string, title: string, slug: string, author: string}}[]>

import { z } from 'zod'

export const ReactionListOutputSchema = z.object({
	id: z.number(),
	createdAt: z.date(),
	type: z.string(),
	text: z.string(),
	book: z.object({
		picture: z.string(),
		title: z.string(),
		slug: z.string()
	})
})

export const ReactionByBookOutputSchema = z.object({
	id: z.number(),
	type: z.string(),
	text: z.string(),
	xpath: z.string(),
	startOffset: z.number(),
	endOffset: z.number()
})
