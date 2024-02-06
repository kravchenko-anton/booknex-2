'use client'

import EbookInfo from '@/features/books/overview/ebook-info'
import FeedbackTable from '@/features/books/overview/feedback/feedback-table'
import UpdateBio from '@/features/books/overview/update-bio'
import UpdatePicture from '@/features/books/overview/update-picture'
import ActivityList from '@/features/books/shared/activity-list'
import { bookService } from '@/shared/services/book/book-service'
import Loader from '@/shared/ui/loader/loader'
import { useUploadFile } from '@/shared/utils/files'
import { successToast } from '@/shared/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { StorageFolderEnum } from 'backend/src/storage/storage.types'
import type { BookUpdatePayload } from 'global/services-types/book-types'
import { useParams, useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

const Page = () => {
	const { upload } = useUploadFile()
	const parameters = useParams()
	const router = useRouter()
	const { data: book } = useQuery({
		queryKey: ['book-overview', +parameters.id],
		queryFn: () => bookService.infoById(+parameters.id)
	})
	const { mutateAsync: update } = useMutation({
		mutationKey: ['update-book'],
		mutationFn: ({ id, payload }: { id: number; payload: BookUpdatePayload }) =>
			bookService.update(id, payload),
		onSuccess: () => {
			successToast('Book updated')
			router.refresh()
		}
	})

	const { mutateAsync: remove } = useMutation({
		mutationKey: ['remove-book'],
		mutationFn: (id: number) => bookService.delete(id),
		onSuccess: () => {
			successToast('Book removed')
			router.push('/admin/books')
		}
	})

	if (!book) return <Loader />

	return (
		<div>
			<h1 className='text-3xl'>Book overview</h1>
			<div className='mt-4 flex gap-5 px-2'>
				<div>
					<UpdatePicture
						picture={book.picture}
						updatePicture={async picture => {
							await upload({
								folder: StorageFolderEnum.ebooks,
								name: book.title + '.png',
								blob: new Blob([picture])
							}).then(async url => {
								await update({
									id: book.id,
									payload: {
										picture: url.name
									}
								})
							})
						}}
					/>
					<div className='mt-4 px-0.5'>
						<div className='border-foreground my-2 border-2 p-2'>
							<p className='text-md mb-1'>
								finished By:
								<b className='text-white'> {book._count.finishedBy}</b>
							</p>
							<p className='text-md mb-1'>
								saved By: <b className='text-white'> {book._count.savedBy}</b>
							</p>

							<p className='text-md mb-1'>
								reading By:
								<b className='text-white'> {book._count.readingBy}</b>
							</p>

							<p className='text-md mb-1'>
								create At:
								<b className='text-white'>
									{' ' + new Date(book.createdAt).toLocaleDateString()}
								</b>
							</p>
							<p className='text-md'>
								update At:
								<b className='text-white'>
									{' ' + new Date(book.updatedAt).toLocaleDateString()}
								</b>
							</p>
						</div>
						<div className='flex gap-2'>
							<button
								className={twMerge(
									'mt-1 rounded-md px-2 py-1 text-white',
									book.visible ? 'bg-success' : 'bg-warning'
								)}
								onClick={() =>
									update({
										id: book.id,
										payload: {
											visible: !book.visible
										}
									})
								}
							>
								{book.visible ? 'Make unavailable' : 'Make available'}
							</button>
							<button
								className={twMerge(
									'bg-danger mt-1 rounded-md px-2 py-1 text-white'
								)}
								onClick={() =>
									toast('Are you sure you want to delete this book?', {
										action: {
											label: 'Delete',
											onClick: () => remove(book.id)
										}
									})
								}
							>
								Remove
							</button>
						</div>
					</div>
				</div>
				<div className='w-5/6'>
					<UpdateBio
						genres={book.genres.map(genre => genre.id)}
						author={book.author}
						title={book.title}
						description={book.description}
						pages={book.pages}
						popularity={book.popularity}
						onSaveEdit={async data => {
							console.log(data, 'bio')
							await update({
								id: book.id,
								payload: data
							})
						}}
					/>
					<EbookInfo
						bookLink={book.ebook}
						onEdit={async books => {
							await upload({
								name: book.title + '.json',
								blob: new Blob([JSON.stringify(books)]),
								folder: StorageFolderEnum.ebooks
							}).then(async url => {
								await update({
									id: book.id,
									payload: {
										ebook: url.name
									}
								})
							})
						}}
					/>
					<ActivityList data={book.activities} />
					<FeedbackTable feedback={book.feedback} />
				</div>
			</div>
		</div>
	)
}
export default Page
