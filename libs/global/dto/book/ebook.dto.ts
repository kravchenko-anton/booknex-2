import { z } from 'zod'

export const EbookChapterDto = z.object({
	id: z.number().min(1),
	name: z.string(),
	text: z.string()
})

// Define the schema for EBookTypeDto
export const EBookTypeDto = z.object({
	title: z.string(),
	id: z.number().min(1),
	chapters: z.array(EbookChapterDto)
})
