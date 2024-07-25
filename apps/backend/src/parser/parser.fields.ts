import { Prisma } from '@prisma/client'

export const parserCatalogFields = ({
	page,
	perPage,
	searchTerm
}: {
	page: number
	perPage: number
	searchTerm: string
}) =>
	({
		take: perPage,
		select: Prisma.validator<Prisma.BookTemplateSelect>()({
			title: true,
			id: true,
			rating: true,
			description: true,
			author: true,
			genres: true,
			picture: true
		}),
		...(page && {
			skip: page * perPage
		}),
		...(searchTerm && {
			where: {
				OR: [
					{
						author: {
							contains: searchTerm,
							mode: 'insensitive' as const
						}
					},
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive' as const
						}
					}
				]
			},
			...(searchTerm && {
				where: {
					id: searchTerm
				}
			})
		})
	}) as const

export const bookTemplateByIdFields = (id: string) => ({
	where: {
		id
	},
	select: Prisma.validator<Prisma.BookTemplateSelect>()({
		title: true,
		id: true,
		rating: true,
		description: true,
		author: true,
		picture: true,
		genres: true
	})
})
