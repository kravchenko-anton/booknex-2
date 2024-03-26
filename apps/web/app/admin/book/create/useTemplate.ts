import { CreateBookValidationType } from '@/app/admin/book/_validation/create.book.dto'
import api from '@/services/api'
import { errorToast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLayoutEffect } from 'react'
import type { UseFormReset } from 'react-hook-form'

export const useTemplate = ({
	templateId,
	reset
}: {
	templateId: number
	reset: UseFormReset<CreateBookValidationType>
}) => {
	const { data: template } = useQuery({
		queryKey: ['book-template'],
		queryFn: () => api.parser.byId(templateId),
		enabled: Boolean(templateId),
		select: data => data.data
	})
	const { mutateAsync: deleteTemplate } = useMutation({
		mutationKey: ['delete-template'],
		mutationFn: (id: number) => api.parser.remove(id),
		onError: () => errorToast('Error while removing template')
	})
	useLayoutEffect(() => {
		if (!template) return
		reset({
			title: template.title,
			description: template.description,
			author: template.author,
			rating: template.rating,
			genres: template.genres.map(genre => genre.id)
		})
	}, [reset, template])

	return { deleteTemplate }
}
