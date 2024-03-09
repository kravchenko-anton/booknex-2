'use client'

import UpdateBio from '@/app/admin/book/[id]/_ui/update-bio'
import UpdateGenres from '@/app/admin/book/[id]/_ui/update-genres'
import UpdatePicture from '@/app/admin/book/[id]/_ui/update-picture'
import EbookInfo from '@/app/admin/book/_shared/ui/ebook-info'
import ReviewTable from '@/app/admin/book/_shared/ui/review/review-table'
import ActivityList from '@/components/activity-list'
import Loader from '@/components/ui/loader/loader'
import { cn } from '@/utils'
import { acceptToast } from '@/utils/toast'
import * as React from 'react'
import { useOverview } from './useOverview'
//TODO: сделать во фронте при композиции книги типы которые в бекенде
const Page = () => {
	const { book, remove, update, updateEbook, toggleVisibility, updatePicture } =
		useOverview()
	if (!book) return <Loader />

	return (
		<div>
			<h1 className='text-3xl'>Book overview</h1>
			<div className='mt-4  gap-5 px-2 md:flex'>
				<div>
					<UpdatePicture
						picture={book.picture}
						updatePicture={async picture => {
							await updatePicture(picture)
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
						<div className='mb-4 flex gap-2 md:mt-0'>
							<button
								className={cn(
									'mt-1 rounded-lg px-2 py-1 text-white',
									book.visible ? 'bg-success' : 'bg-warning'
								)}
								onClick={toggleVisibility}
							>
								{book.visible ? 'Hide' : 'Show'}
							</button>
							<button
								className={cn('bg-danger mt-1 rounded-lg px-2 py-1 text-white')}
								onClick={() =>
									acceptToast('Are you sure you want to delete this book?', {
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

				<div className='md:w-5/6'>
					<UpdateBio
						author={book.author}
						title={book.title}
						description={book.description}
						rating={book.rating}
						readingTime={book.readingTime}
						onSaveEdit={async data => {
							await update({
								id: book.id,
								payload: data
							})
						}}
					/>
					<UpdateGenres
						bookId={book.id}
						defaultGenres={book.genres.map(genre => genre.id)}
					/>
					<ActivityList data={book.activities} />
					<EbookInfo
						bookLink={book.ebook}
						onEdit={async books => {
							await updateEbook({
								id: book.id,
								payload: books
							})
						}}
					/>
					<ReviewTable review={book.review} />
				</div>
			</div>
		</div>
	)
}
export default Page
