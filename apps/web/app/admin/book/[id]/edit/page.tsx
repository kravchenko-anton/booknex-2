'use client'
import SelectGenres from '@/app/admin/book/[id]/_ui/select-genres'
import { SelectPicture } from '@/app/admin/book/[id]/_ui/select-picture'
import {
	UpdateBookValidation,
	UpdateBookValidationType
} from '@/app/admin/book/_validation/update.book.dto'
import Editor from '@/components/book-editor/editor'
import { Button, Field, FormTextArea } from '@/components/ui'
import Loader from '@/components/ui/loader/loader'
import api from '@/services/api'
import { cn } from '@/utils'
import { dirtyValues } from '@/utils/getDirtyValues'
import { validateNumberParameter } from '@/utils/validate-parameter'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PenNib, Star } from 'icons'
import { useParams } from 'next/navigation'
import { useEffect, type FC } from 'react'
import { useForm } from 'react-hook-form'

const Page: FC = () => {
	const parameters = useParams()
	const bookId = validateNumberParameter(parameters.id)
	const queryClient = useQueryClient()

	const {
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors, dirtyFields }
	} = useForm<UpdateBookValidationType>({
		resolver: zodResolver(UpdateBookValidation)
	})

	const { data: book } = useQuery({
		queryKey: ['book-edit-info', bookId],
		queryFn: () => api.book.adminInfoById(bookId),
		select: data => data.data
	})
	const { data: ebook } = useQuery({
		queryKey: ['stored-ebook', bookId],
		queryFn: () => api.ebook.storedEbook(bookId),
		select: data => data.data
	})

	const { mutateAsync: edit, isLoading: editLoading } = useMutation({
		mutationKey: ['update-book'],
		mutationFn: ({
			id,
			payload
		}: {
			id: number
			payload: UpdateBookValidationType
		}) => api.book.update(id, payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['book-edit-info', bookId]
			})
		}
	})

	useEffect(() => {
		if (!book || !ebook) return
		reset({
			title: book.title,
			description: book.description,
			author: book.author,
			rating: book.rating,
			genres: book.genres.map(genre => genre.id),
			picture: book.picture,
			ebook: ebook
		})
	}, [reset, book, bookId, ebook])

	const handleEdit = handleSubmit(async (data: UpdateBookValidationType) => {
		console.log(data)
		console.log(dirtyValues(dirtyFields, data))
		// await edit({
		//   id: bookId,
		//   payload:
		// });
	})

	console.log(dirtyFields)
	if (!book) return <Loader />
	return (
		<div>
			<h1 className='mb-4 text-center text-3xl font-medium'>
				Edit <b>{book.title}</b> book
			</h1>
			<div className='mb-4 justify-between gap-5  md:flex'>
				<div>
					<div>
						<h1 className='mt-2  text-xl'>Cover</h1>
						<SelectPicture control={control} bookTitle={watch('title')} />
						<h1 className='my-1'>Genres</h1>

						<SelectGenres control={control} />
						<div className='mt-2 flex items-center justify-between'>
							<h1 className=''>Visibility</h1>
							<Button
								size={'sm'}
								className={cn('', book.visible ? 'bg-success' : 'bg-warning')}
								isLoading={editLoading}
								onClick={async () => {
									await edit({
										id: book.id,
										payload: {
											visible: !book.visible
										}
									})
								}}>
								{book.visible ? 'Hide' : 'Show'}
							</Button>
						</div>
					</div>
				</div>
				<div className='w-11/12'>
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
			<Editor control={control} />
			<Button
				size='sm'
				isLoading={editLoading}
				className='mt-4'
				variant={Object.keys(errors).length > 0 ? 'danger' : 'foreground'}
				onClick={handleEdit}>
				Edit
			</Button>
		</div>
	)
}
export default Page
