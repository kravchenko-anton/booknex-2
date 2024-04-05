import { CreateBookValidationType } from '@/app/admin/book/_validation/create.book.dto'
import { useTemplate } from '@/app/admin/book/create/useTemplate'
import api from '@/services/api'
import { secureRoutes } from '@/utils/route'
import { successToast } from '@/utils/toast'
import { validateStringParameter } from '@/utils/validate-parameter'
import { useMutation } from '@tanstack/react-query'
import type { CreateBookDto } from 'global/api-client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
//TODO: пофиксить полностью создание книги чтобы работало без багов
export const useCreateForm = () => {
	const parameters = useSearchParams()
	const templateSlug = validateStringParameter(parameters.get('template'))
	const router = useRouter()
	const {
		control,
		reset,
		watch,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors }
	} = useForm<CreateBookValidationType>({})

	const { deleteTemplate } = useTemplate({ templateSlug, reset })

	const { mutateAsync: create, isLoading: createLoading } = useMutation({
		mutationKey: ['create-book'],
		mutationFn: (payload: CreateBookDto) =>
			api.book.create(payload),
		onSuccess: async data => {
			console.log('data  in success', data)
			if (templateSlug) {
				await deleteTemplate(templateSlug)
			}
			successToast('Book created')
			router.push(secureRoutes.bookCatalogRoute)
		}
	})

	const handleCreate = handleSubmit(async (data: CreateBookValidationType) => {
		await create(data)
	})

	return {
		watch,
		control,
		errors,
		setValue,
		reset,
		getValues,
		handleCreate,
		createLoading
	}
}
