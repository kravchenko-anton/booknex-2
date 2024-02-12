import { parserService } from '@/services/parser/parser-services'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useLayoutEffect } from 'react'
import type { UseFormSetValue } from 'react-hook-form'

export const useTemplate = ({
	setValue
}: {
	setValue: UseFormSetValue<{
		title?: string
		picture?: { name?: string; blob?: Blob }
		pages?: number
		description?: string
		popularity?: number
		author?: string
		books?: {
			name?: string
			content?: { id?: number; title?: string; content?: string }[]
		}[]
		genres?: number[]
	}>
}) => {
	const parameters = useSearchParams()
	const id = Number(parameters.get('template'))
	const { data: template } = useQuery({
		queryKey: ['book-template'],
		queryFn: () => parserService.byId(id),
		enabled: Boolean(id)
	})
	useLayoutEffect(() => {
		if (template) {
			setValue('title', template.title)
			setValue('description', template.description)
			setValue('author', template.author)
			setValue('pages', template.pages)
			setValue('popularity', template.popularity)
			setValue(
				'genres',
				template.genres.map(genre => genre.id)
			)
		}
	}, [setValue, template])

	return {
		id
	}
}