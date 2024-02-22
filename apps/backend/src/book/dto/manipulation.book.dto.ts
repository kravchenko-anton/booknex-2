import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

const OpenApiProperty = {
	title: {
		description: 'Title of the book',
		example: 'The Great Gatsby'
	},
	author: {
		description: 'Author of the book',
		example: 'F. Scott Fitzgerald'
	},
	description: {
		description: 'Description of the book',
		example:
			"The Great Gatsby is a novel by the American author F. Scott Fitzgerald. First published in 1925, it is set on Long Island's North Shore and in New York City from spring to autumn of 1922."
	},
	picture: {
		description: 'Uploaded picture',
		example: 'picture.jpg'
	},
	ebook: {
		description: 'Uploaded ebook',
		example: 'ebook.pdf'
	},
	pages: {
		description: 'Number of pages in the book',
		example: 300
	},
	popularity: {
		description: 'Number of goodRead reviews',
		example: 1_000_000
	},
	genres: {
		description: 'Array of genres',
		example: [1, 2, 3]
	}
}
export const CreateBookZ = extendApi(
	z.object({
		title: z.string().min(1).max(255),
		author: z.string().min(1).max(255),
		description: z.string().min(1).max(255),
		picture: z.string().min(1).max(255),
		ebook: z.string().min(1).max(255),
		pages: z.number().positive(),
		popularity: z.number().positive(),
		genres: z.array(z.number().positive())
	}),
	OpenApiProperty
)

export const EditBookZ = extendApi(
	z.object({
		title: z.string().min(1).max(255).optional(),
		author: z.string().min(1).max(255).optional(),
		description: z.string().min(1).max(255).optional(),
		picture: z.string().min(1).max(255).optional(),
		ebook: z.string().min(1).max(255).optional(),
		pages: z.number().positive().optional(),
		popularity: z.number().positive().optional(),
		genres: z.array(z.number().positive()).optional()
	}),
	OpenApiProperty
)
export class CreateBookDto extends createZodDto(CreateBookZ) {}
export class EditBookDto extends createZodDto(EditBookZ) {}
