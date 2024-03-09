import type { CreateBookDtoType } from '@/app/admin/book/_shared/validation/create.book.dto'
import api from '@/services'
import { useQuery } from '@tanstack/react-query'

import { useSearchParams } from 'next/navigation'
import { useLayoutEffect } from 'react'
import type { UseFormSetValue } from 'react-hook-form'

export const useTemplate = ({
	setValue
}: {
	setValue: UseFormSetValue<CreateBookDtoType>
}) => {
	const parameters = useSearchParams()
	const id = Number(parameters.get('template'))
	const { data: template } = useQuery({
		queryKey: ['book-template'],
		queryFn: () => api.parser.byId(id),
		enabled: Boolean(id),
		select: data => data.data
	})
	useLayoutEffect(() => {
		if (template) {
			setValue('title', template.title)
			setValue('description', template.description)
			setValue('author', template.author)
			setValue('rating', template.rating)
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
