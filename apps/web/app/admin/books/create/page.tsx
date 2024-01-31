'use client'
import Editor from '@/features/books/book-compose/editor'
import SelectGenres from '@/features/books/create/select-genres'
import { useBookCompose } from '@/features/books/create/useBookCompose'
import { useCreateForm } from '@/features/books/create/useCreateForm'
import {
	Button,
	DropZone,
	ErrorMessage,
	Field,
	FormTextArea
} from '@/shared/ui'
import { Book, PenNib, User } from 'icons'
import type { FC } from 'react'

const Page: FC = () => {
	const { books } = useBookCompose()
	const form = useCreateForm()
	console.log(books)
	return (
		<div>
			<h1 className='mb-4 text-center text-3xl font-medium'>Create book</h1>
			<div className=' mb-4 flex justify-between  gap-5'>
				<div className='w-11/12'>
					<div className='mt-2 flex justify-between gap-3'>
						<div className='w-1/3'>
							<h1 className='mb-2'>Title</h1>
							<Field
								type='text'
								control={form.control}
								name='title'
								placeholder='Title'
							/>
						</div>
						<div className='w-1/3'>
							<h1 className='mb-2'>Author</h1>
							<Field
								type='text'
								icon={PenNib}
								control={form.control}
								name='author'
								placeholder='Author'
							/>
						</div>

						<div>
							<h1 className='mb-2'>Pages</h1>
							<Field
								type='number'
								icon={Book}
								control={form.control}
								name='pages'
								placeholder='Pages'
							/>
						</div>
						<div>
							<h1 className='mb-2'>Popularity</h1>
							<Field
								icon={User}
								type='number'
								control={form.control}
								name='popularity'
								placeholder='Popularity'
							/>
						</div>
					</div>
					<h1 className='mb-2 mt-4'>Description</h1>
					<FormTextArea
						control={form.control}
						name='description'
						placeholder='Enter description'
						className='h-[250px]'
					/>
				</div>

				<div>
					<div>
						<h1 className='mt-2  text-xl'>Book file</h1>
						<DropZone
							size='md'
							multiple={true}
							accept='.epub'
							onFileDelete={file =>
								books.delete({
									name: file.name
								})
							}
							onDropFile={books.upload}
						/>
						<ErrorMessage name='books' errors={form.errors} />
					</div>
					<div>
						<h1 className='mt-2  text-xl'>Cover</h1>
						<DropZone
							size='md'
							multiple={false}
							accept='image/*'
							onDropFile={acceptedFiles => {
								form.setValue('picture', {
									name: acceptedFiles[0].name,
									blob: new Blob([acceptedFiles[0]])
								})
							}}
						/>
						<ErrorMessage name='picture' errors={form.errors} />
					</div>
					<h1 className='mb-2 mt-2  text-xl'>Genres</h1>
					<SelectGenres control={form.control} />
				</div>
			</div>
			<Editor {...books} />

			<Button
				size='md'
				className='mt-4'
				onClick={() => {
					form.setValue('books', books.state)
					form.submit()
				}}
				variant='primary'
			>
				Create
			</Button>
		</div>
	)
}

export default Page
