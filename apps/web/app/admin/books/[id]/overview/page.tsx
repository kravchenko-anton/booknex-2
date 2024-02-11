'use client'

import EbookInfo from '@/app/admin/books/[id]/overview/_components/ebook-info'
import FeedbackTable from '@/app/admin/books/[id]/overview/_components/feedback/feedback-table'
import UpdateBio from '@/app/admin/books/[id]/overview/_components/update-bio'
import UpdatePicture from '@/app/admin/books/[id]/overview/_components/update-picture'
import ActivityList from '@/components/dialogs/activity-list'
import Loader from '@/components/ui/loader/loader'
import { bookService } from '@/services/book/book-service'
import { cn } from '@/utils'
import { useUploadFile } from '@/utils/files'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StorageFolderEnum } from 'backend/src/storage/storage.types'
import type { BookUpdatePayload } from 'global/services-types/book-types'
import { useParams, useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'

const Page = () => {
	const { upload } = useUploadFile()
	const parameters = useParams()
	const queryClient = useQueryClient()
	const router = useRouter()
	const id = Number(parameters.id)
	const { data: book } = useQuery({
		queryKey: ['book-overview', id],
		queryFn: () => bookService.infoById(id)
	})
	const { mutateAsync: update } = useMutation({
		mutationKey: ['update-book'],
		mutationFn: ({ id, payload }: { id: number; payload: BookUpdatePayload }) =>
			bookService.update(id, payload),
		onSuccess: async () => {
			successToast('Book updated')
			await queryClient.invalidateQueries({
				queryKey: ['book-overview', id]
			})
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
								className={cn(
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
								{book.visible ? 'Hide' : 'Show'}
							</button>
							<button
								className={cn('bg-danger mt-1 rounded-md px-2 py-1 text-white')}
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
							await update({
								id: book.id,
								payload: data
							})
						}}
					/>
					<ActivityList data={book.activities} />

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
					<FeedbackTable feedback={book.feedback} />
				</div>
			</div>
		</div>
	)
}
export default Page
