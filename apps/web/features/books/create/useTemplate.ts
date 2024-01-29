import { parserService } from '@/shared/services/parser/parser-services'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useLayoutEffect } from 'react'

export const useTemplate = ({
	setValue
}: {
	setValue: (field: string, value: string | number | number[]) => void
}) => {
	const parameters = useSearchParams()
	const { data: template } = useQuery({
		queryKey: ['book template'],
		queryFn: () => parserService.byId(+parameters.get('template')),
		enabled: Boolean(+parameters.get('template'))
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
}
