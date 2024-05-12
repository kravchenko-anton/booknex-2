import { _useTemplate } from '@/app/admin/book/create/_useTemplate'
import api from '@/services/api'
import { secureRoutes } from '@/utils/route'
import { successToast } from '@/utils/toast'
import { validateStringParameter } from '@/utils/validate-parameter'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { CreateBookDto } from 'global/api-client'
import { MutationKeys } from 'global/utils/query-keys'
import {
	CreateBookSchema,
	type CreateBookSchemaType
} from 'global/validation/book/create.book.dto'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
//TODO: пофиксить полностью создание книги чтобы работало без багов
export const _useCreateForm = () => {
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
	} = useForm<CreateBookSchemaType>({
		resolver: zodResolver(CreateBookSchema),
		mode: 'onBlur'
	})

	const { deleteTemplate } = _useTemplate({ templateSlug, reset })

	const { mutateAsync: create, isPending: createLoading } = useMutation({
		mutationKey: MutationKeys.book.createBook,
		mutationFn: (payload: CreateBookDto) => api.book.create(payload),
		onSuccess: async data => {
			console.log('data  in success', data)
			if (templateSlug) {
				await deleteTemplate(templateSlug)
			}
			successToast('Book created')
			router.push(secureRoutes.bookCatalogRoute)
		}
	})

	const handleCreate = handleSubmit(async (data: CreateBookSchemaType) => {
		await create(data)
	})
	console.log(watch('genres'))
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
