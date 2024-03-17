'use client'

import { BookRemoveButton } from '@/app/admin/book/[id]/_ui/book-remove-button'
import BookStatistic from '@/app/admin/book/[id]/_ui/book-statistic'
import BookUpdateBio from '@/app/admin/book/[id]/_ui/book-update-bio'
import BookUpdateGenres from '@/app/admin/book/[id]/_ui/book-update-genres'
import BookUpdatePicture from '@/app/admin/book/[id]/_ui/book-update-picture'
import { BookVisibleButton } from '@/app/admin/book/[id]/_ui/book-visible-button'
import ReviewTable from '@/app/admin/book/[id]/_ui/review/review-table'
import EbookInfo from '@/app/admin/book/_shared/ui/ebook-info'
import ActivityList from '@/components/activity-list'
import Loader from '@/components/ui/loader/loader'
import * as React from 'react'
import { useOverview } from './useOverview'
//TODO: сделать во фронте при композиции книги типы которые в бекенде
const Page = () => {
	const { book, updateEbook, updateEbookLoading, onUpdateSuccess } =
		useOverview()
	if (!book) return <Loader />

	return (
		<div>
			<h1 className='text-3xl'>Book overview</h1>
			<div className='mt-4 flex  gap-5 px-2 md:flex'>
				<div>
					<BookUpdatePicture
						picture={book.picture}
						id={book.id}
						onSuccess={onUpdateSuccess}
					/>
					<div className='mt-4 px-0.5'>
						<BookStatistic
							readingTime={book.readingTime}
							createdAt={book.createdAt}
							_count={book._count}
							updatedAt={book.updatedAt}
						/>
						<div className='mb-4 flex gap-2 md:mt-0'>
							<BookVisibleButton
								visible={book.visible}
								id={book.id}
								onSuccess={onUpdateSuccess}
							/>
							<BookRemoveButton id={book.id} onSuccess={onUpdateSuccess} />
						</div>
					</div>
				</div>

				<div className='md:w-5/6'>
					<BookUpdateBio
						author={book.author}
						title={book.title}
						description={book.description}
						rating={book.rating}
						readingTime={book.readingTime}
						onSuccess={onUpdateSuccess}
					/>
					<BookUpdateGenres
						bookId={book.id}
						defaultGenres={book.genres.map(genre => genre.id)}
					/>
					<ActivityList data={book.activities} />
					<EbookInfo
						isLoading={updateEbookLoading}
						bookId={book.id}
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
