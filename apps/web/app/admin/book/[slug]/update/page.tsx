'use client'
import EbookEditor from '@/app/admin/book/_components/ebook-editor/editor'
import SelectGenres from '@/app/admin/book/_components/select-genres'
import { SelectPicture } from '@/app/admin/book/_components/select-picture'

import { Button, Field, FormTextArea } from '@/components/ui'
import Loader from '@/components/ui/loader/loader'
import api from '@/services/api'
import { dirtyValues } from '@/utils/getDirtyValues'
import { errorToast, successToast } from '@/utils/toast'
import { validateStringParameter } from '@/utils/validate-parameter'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'
import {
	UpdateBookSchema,
	type UpdateBookSchemaType
} from 'global/validation/book/update.book.dto'
import { PenNib, Star } from 'icons'
import { useParams } from 'next/navigation'
import { useEffect, type FC } from 'react'
import { useForm } from 'react-hook-form'

const Page: FC = () => {
	const parameters = useParams()
	const bookSlug = validateStringParameter(parameters.slug)
	const queryClient = useQueryClient()

	const {
		control,
		reset,
		handleSubmit,
		formState: { errors, dirtyFields }
	} = useForm<UpdateBookSchemaType>({
		resolver: zodResolver(UpdateBookSchema)
	})

	const { data: book } = useQuery({
		queryKey: QueryKeys.book.adminInfoBySlug(bookSlug),
		queryFn: () => api.book.adminInfoBySlug(bookSlug),
		select: data => data.data
	})
	const { data: ebook } = useQuery({
		queryKey: QueryKeys.ebook.storedEbookBySlug(bookSlug),

		queryFn: () => api.ebook.storedEbookBySlug(bookSlug),
		select: data => data.data
	})

	const { mutateAsync: update, isPending: updateLoading } = useMutation({
		mutationKey: MutationKeys.book.update,
		mutationFn: (payload: UpdateBookSchemaType) =>
			api.book.update(bookSlug, payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.book.adminInfoBySlug(bookSlug)
			})
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.book.catalog.key
			})
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.book.overview.bySlug(bookSlug)
			})
			successToast('Book updated')
		}
	})

	useEffect(() => {
		if (!book || !ebook) return
		reset({
			title: book.title,
			description: book.description,
			author: book.author,
			rating: book.rating,
			genres: book.genres,
			picture: book.picture,
			ebook: ebook
		})
	}, [reset, book, bookSlug, ebook])

	const handleUpdate = handleSubmit(async (data: UpdateBookSchemaType) => {
		if (Object.keys(dirtyValues(dirtyFields, data)).length === 0)
			return errorToast('Please fill some fields to update the book')
		await update(dirtyValues(dirtyFields, data))
	})

	console.log(dirtyFields)
	if (!book || !ebook) return <Loader />
	return (
		<div>
			<h1 className='mb-4 text-center text-3xl font-medium'>
				Update <b>{book.title}</b> book
			</h1>
			<div className='mb-4 justify-between gap-5  md:flex'>
				<div>
					<div>
						<h1 className='mt-2  text-xl'>Cover</h1>
						<SelectPicture name='picture' control={control} />
						<h1 className='my-1'>Genres</h1>

						<SelectGenres name='genres' control={control} />
						<div className='mt-2 flex items-center justify-between'>
							<h1 className=''>Visibility</h1>
							<Button
								size={'sm'}
								variant={book.recommendable ? 'success' : 'warning'}
								isLoading={updateLoading}
								onClick={async () => {
									await update({
										isPublic: !book.isPublic
									})
								}}>
								{book.isPublic ? 'Hide' : 'Show'}
							</Button>
						</div>
						<div className='mt-2 flex items-center justify-between'>
							<h1 className=''>Recommendable</h1>
							<Button
								size={'sm'}
								isLoading={updateLoading}
								variant={book.recommendable ? 'muted' : 'danger'}
								onClick={async () => {
									await update({
										recommendable: !book.recommendable
									})
								}}>
								{book.recommendable ? 'Disable' : 'Enable'}
							</Button>
						</div>
					</div>
				</div>
				<div className='w-10/12'>
					<div className='mt-2 gap-3 md:flex'>
						<div className=' md:w-1/2'>
							<h1 className='my-2'>Title</h1>
							<Field
								type='text'
								control={control}
								name='title'
								placeholder='Title'
							/>
						</div>
						<div className=' md:w-1/3'>
							<h1 className='my-2'>Author</h1>
							<Field
								type='text'
								icon={PenNib}
								control={control}
								name='author'
								placeholder='Author'
							/>
						</div>

						<div className='md:w-1/4'>
							<h1 className='my-2'>Rating</h1>
							<Field
								icon={Star}
								type='number'
								control={control}
								name='rating'
								placeholder='Rating'
								min={1}
								max={5}
							/>
						</div>
					</div>
					<h1 className='my-2'>Description</h1>
					<FormTextArea
						control={control}
						name='description'
						placeholder='Enter description'
						className='h-[240px]'
					/>
				</div>
			</div>

			<EbookEditor control={control} name='ebook' />
			<Button
				size='sm'
				isLoading={updateLoading}
				className='mt-4'
				variant={Object.keys(errors).length > 0 ? 'danger' : 'foreground'}
				onClick={handleUpdate}>
				Update
			</Button>
		</div>
	)
}
export default Page
