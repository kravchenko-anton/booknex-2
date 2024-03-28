import { CreateBookValidationType } from '@/app/admin/book/_validation/create.book.dto'
import api from '@/services/api'
import { errorToast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLayoutEffect } from 'react'
import type { UseFormReset } from 'react-hook-form'

export const useTemplate = ({
	templateSlug,
	reset
}: {
	templateSlug: string
	reset: UseFormReset<CreateBookValidationType>
}) => {
	const { data: template } = useQuery({
		queryKey: ['book-template'],
		queryFn: () => api.parser.bySlug(templateSlug),
		enabled: Boolean(templateSlug),
		select: data => data.data
	})
	const { mutateAsync: deleteTemplate } = useMutation({
		mutationKey: ['delete-template'],
		mutationFn: (templateSlug: string) => api.parser.remove(templateSlug),
		onError: () => errorToast('Error while removing template')
	})
	useLayoutEffect(() => {
		if (!template) return
		reset({
			title: template.title,
			description: template.description,
			author: template.author,
			rating: template.rating,
			genres: template.genres.map(genre => genre.slug)
		})
	}, [reset, template])

	return { deleteTemplate }
}
