import Editor from '@/features/books/book-compose/editor'
import type { EbookType } from '@/features/books/create/useBookCompose'
import { useBookCompose } from '@/features/books/create/useBookCompose'
import { Button, DropZone } from '@/shared/ui'
import { errorToast } from '@/shared/utils/toast'
import type { FC } from 'react'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

const ebookValidator = z
	.array(
		z
			.object({
				name: z.string().refine(value => !value.includes('epub'), {
					message: 'Book name can not include "epub"'
				}),
				content: z
					.array(
						z.object({
							title: z.string(),
							content: z.string()
						})
					)
					.min(1)
			})
			.refine(value => value.name.length > 0, {
				message: 'File is required'
			})
	)
	.min(1)

const EditEbook: FC<{
	ebook: EbookType[]
	onEdit: (books: EbookType[]) => void
}> = ({ ebook, onEdit }) => {
	const { books } = useBookCompose(ebook)
	console.log(books)
	return (
		<>
			<DropZone
				size='sm'
				multiple={true}
				accept='.epub'
				onFileDelete={file =>
					books.delete({
						name: file.name
					})
				}
				onDropFile={books.upload}
			/>
			{books.state && (
				<div
					className={twMerge(
						'mt-8   gap-2',
						books.state.length > 1 && 'grid grid-cols-2'
					)}
				>
					<Editor {...books} />
				</div>
			)}
			<Button
				size='md'
				variant='primary'
				onClick={() => {
					ebookValidator
						.parseAsync(books.state)
						.then(value => {
							onEdit(value as any)
						})
						.catch(error => {
							errorToast(error)
						})
				}}
			>
				Save
			</Button>
		</>
	)
}

export default EditEbook
