'use client'
import Editor from '@/app/admin/books/_shared/book-compose/editor'
import type { EbookValidationType } from '@/app/admin/books/_shared/ebook-validation'
import { useCreateForm } from '@/app/admin/books/create/_helpers/useCreateForm'
import SelectGenres from '@/app/admin/books/create/_ui/select-genres'
import {
	Button,
	DropZone,
	ErrorMessage,
	Field,
	FormTextArea
} from '@/components/ui'
import { Book, PenNib, User } from 'icons'
import type { FC } from 'react'

const Page: FC = () => {
	const form = useCreateForm()
	return (
		<div>
			<h1 className='mb-4 text-center text-3xl font-medium'>Create book</h1>
			<div className=' mb-4 justify-between gap-5  md:flex'>
				<div className='w-11/12'>
					<div className='mt-2 justify-between gap-3 md:flex'>
						<div className='md:w-1/3'>
							<h1 className='my-2'>Title</h1>
							<Field
								type='text'
								control={form.control}
								name='title'
								placeholder='Title'
							/>
						</div>
						<div className='md:w-1/3'>
							<h1 className='my-2'>Author</h1>
							<Field
								type='text'
								icon={PenNib}
								control={form.control}
								name='author'
								placeholder='Author'
							/>
						</div>

						<div>
							<h1 className='my-2'>Pages</h1>
							<Field
								type='number'
								icon={Book}
								control={form.control}
								name='pages'
								placeholder='Pages'
							/>
						</div>
						<div>
							<h1 className='my-2'>Popularity</h1>
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
						<h1 className='mt-2  text-xl'>Cover</h1>
						<DropZone
							size='sm'
							multiple={false}
							accept='image/*'
							onDropFile={acceptedFiles => {
								form.setValue('picture', acceptedFiles[0])
							}}
						/>
						<ErrorMessage name='picture' errors={form.errors} />
					</div>
					<h1 className='mb-2 mt-2  text-xl'>Genres</h1>
					<SelectGenres control={form.control} />
				</div>
			</div>
			<Editor
				updateBooks={(books: EbookValidationType) =>
					form.setValue('books', books)
				}
			/>

			<Button
				size='md'
				className='mt-4'
				variant='primary'
				onClick={form.submit}
			>
				Create
			</Button>
		</div>
	)
}

export default Page
