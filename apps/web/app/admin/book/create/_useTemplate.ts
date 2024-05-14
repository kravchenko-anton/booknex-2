import api from '@/services/api'
import { errorToast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'
import type { CreateBookSchemaType } from 'global/validation/book/create.book.schema'
import { useLayoutEffect } from 'react'
import type { UseFormReset } from 'react-hook-form'

export const _useTemplate = ({
	templateSlug,
	reset
}: {
	templateSlug: string
	reset: UseFormReset<CreateBookSchemaType>
}) => {
	const { data: template } = useQuery({
		queryKey: QueryKeys.bookTemplate.bySlug(templateSlug),
		queryFn: () => api.parser.bySlug(templateSlug),
		enabled: Boolean(templateSlug),
		select: data => data.data
	})
	const { mutateAsync: deleteTemplate } = useMutation({
		mutationKey: MutationKeys.bookTemplate.deleteTemplate,
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
			genres: template.genres
		})
	}, [reset, template])

	return { deleteTemplate }
}
