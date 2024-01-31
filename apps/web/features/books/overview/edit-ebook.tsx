import type { EbookType } from '@/features/books/create/useBookCompose'
import { useBookCompose } from '@/features/books/create/useBookCompose'
import { Button, DropZone, ErrorMessage, TextArea } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaseSensitive, ChevronDown, ChevronUp, Close } from 'icons'
import type { FC } from 'react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const editBookValidationSchema = z.object({
	books: z
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
})

export type EditBookValidationSchemaType = z.infer<
	typeof editBookValidationSchema
>

const EditEbook: FC<{
	ebook: EbookType[]
	onEdit: (books: EbookType[]) => void
}> = ({ ebook, onEdit }) => {
	const { books } = useBookCompose(ebook)
	const {
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<EditBookValidationSchemaType>({
		resolver: zodResolver(editBookValidationSchema)
	})
	return (
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
			{books.state && (
				<div>
					<div className='mt-8  grid grid-cols-2 gap-2'>
						{books.state.map((book, index) => (
							<div
								key={book.name + index}
								className='bg-foreground mb-4 mr-1 rounded-xl p-3'
							>
								<div className='mb-4 flex items-center  justify-between gap-2'>
									<input
										onBlur={event =>
											books.updateChapterTitle(event.target.value, book.name)
										}
										defaultValue={book.name}
										className='bg-muted hover:border-foreground focus:border-foreground focus:shadow-outline h-full w-full  rounded-xl border-2  border-transparent px-4 py-3 text-sm text-white  placeholder-white duration-200 ease-linear focus:outline-0'
									/>
									<CaseSensitive
										width={45}
										height={45}
										onClick={() => {
											books.generateChaptersNames(book.name)
											console.log('generate chapters names')
										}}
										className='bg-muted cursor-pointer rounded-xl p-2'
									/>
								</div>
								{book.content.map((content, index) => (
									<div key={content.id} className='bg-muted m-2 rounded-xl p-2'>
										<div className='mb-2 flex w-full items-center justify-between gap-2'>
											<input
												value={content.title}
												onChange={event => {
													books.updateTocTitle(
														content.id,
														book.name,
														event.target.value
													)
												}}
												className='bg-foreground border-gray w-full rounded-xl border-0 px-4 py-2 text-sm text-white placeholder-white  outline-0 duration-200 ease-linear focus:border-2'
											/>
											<div className='flex gap-2'>
												<ChevronUp
													width={36}
													height={36}
													onClick={() => {
														books.mergeContentWithTopCharacter({
															bookName: book.name,
															insertedContent: content.content,
															topChapterId: book.content[index - 1].id
														})
														console.log('merge with top character')
													}}
													className='bg-muted cursor-pointer rounded-xl p-2'
												/>
												<ChevronDown
													width={36}
													height={36}
													onClick={() => {
														books.addNewCharacterAfterContent({
															bookName: book.name,
															afterContent: content.content
														})
														console.log('add new character')
													}}
													className='bg-muted cursor-pointer rounded-xl p-2'
												/>
												<Close
													width={36}
													height={36}
													onClick={() => {
														books.removeToc(book.name, content.id)
														console.log('remove toc')
													}}
													className='bg-muted cursor-pointer rounded-xl p-2'
												/>
											</div>
										</div>

										<TextArea
											value={content.content}
											onChange={event => {
												books.updateTocContent(
													book.name,
													content.id,
													event.target.value
												)
											}}
											variant='background'
											className='min-h-[340px] w-full rounded-xl border-0 px-4 py-2 font-mono text-sm duration-200 ease-linear'
										/>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			)}
			<ErrorMessage name='books' errors={errors} />
			<Button
				size='sm'
				variant='primary'
				// post ony dirty values
				onClick={() => {
					setValue('books', books.state)
					handleSubmit(({ books }: { books: EbookType[] }) => {
						if (!books) return
						onEdit(books)
					})()
				}}
			>
				Save
			</Button>
		</div>
	)
}

export default EditEbook
