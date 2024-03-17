import { useTemplate } from '@/app/admin/book/create/useTemplate'
import api from '@/services'
import { secureRoutes } from '@/utils/route'
import { errorToast, successToast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { PayloadEBook } from 'global/api-client'
import {
	CreateBookDto,
	type CreateBookDtoType
} from 'global/dto/book/create.book.dto'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export const useCreateForm = () => {
	const router = useRouter()
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors }
	} = useForm<CreateBookDtoType>({
		resolver: zodResolver(CreateBookDto)
	})
	console.log(errors, 'it is errors', getValues(), 'it is values')
	const template = useTemplate({ setValue })

	const { mutateAsync: create, isLoading: submitLoading } = useMutation({
		mutationKey: ['create-book'],
		mutationFn: (payload: {
			title: string
			author: string
			description: string
			rating: number
			ebook: PayloadEBook[]
			genres: number[]
			picture: File
		}) =>
			api.book.create(
				payload.title,
				payload.author,
				payload.description,
				payload.rating,
				payload.ebook,
				payload.genres,
				payload.picture
			),
		onError: () => errorToast('Error while uploading book')
	})

	const { mutateAsync: deleteTemplate } = useMutation({
		mutationKey: ['delete-template'],
		mutationFn: (id: number) => api.parser.remove(id),
		onError: () => errorToast('Error while uploading book')
	})

	const submit = handleSubmit(async (data: CreateBookDtoType) => {
		await create({
			title: data.title,
			description: data.description,
			picture: data.picture,
			ebook: data.ebook,
			author: data.author,
			genres: data.genres,
			rating: data.rating
		})
			.then(async () => {
				if (template.id) {
					await deleteTemplate(template.id)
				}
				router.push(secureRoutes.bookCatalogRoute)
				successToast('Book created')
			})
			.catch(() => {
				errorToast('Error while creating book')
			})
	})
	return {
		watch,
		control,
		errors,
		setValue,
		getValues,
		submit,
		submitLoading
	}
}
