import { TrimContentMenu } from '@/app/admin/book/_components/ebook-editor/trim-content-menu'
import { useBookCompose } from '@/app/admin/book/_components/ebook-editor/useBookCompose'
import { DropZone, Input, TextArea } from '@/components/ui'
import ErrorMessage from '@/components/ui/error-message/error-message'
import { errorToast } from '@/utils/toast'
import type { UnfoldOutputImagesInner } from 'global/api-client'
import {
	Copy,
	HardDriveDownload,
	HardDriveUpload,
	Trash
} from 'global/icons/react'
import type { BaseFieldProperties } from 'global/types'
import { postProcessingHtml } from 'global/utils/html-validation'
import { CaseSensitive, ChevronDown, ChevronUp, Close, Combine } from 'icons'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

const EbookComposer = <T extends Record<string, any>>({
	control,
	name
}: BaseFieldProperties<T>) => (
	<Controller
		control={control}
		name={name}
		render={({ field: { value = [], onChange }, fieldState: { error } }) => {
			const [images, setImages] = useState<
				(UnfoldOutputImagesInner & { isUploaded: boolean })[]
			>([])
			const { books } = useBookCompose({
				ebooks: value,
				setEBooks: onChange,
				setImages,
				images
			})
			console.log('errors', error)
			return (
				<div className='md:w-max md:overflow-y-scroll '>
					<div>
						<div className='mb-4'>
							<h1 className='mt-2  text-xl'>Book file</h1>
							<div className='flex items-end gap-2'>
								<DropZone
									multiple
									size='sm'
									accept='.epub'
									disabled={books.unfoldLoading}
									onDropFile={files => {
										books.upload(files)
									}}
									onFileDelete={(_file, index) => {
										if (!books.state[index]?.id) return
										books.delete({
											bookId: books.state[index]?.id || ''
										})
									}}
								/>
								<HardDriveDownload
									width={33}
									height={33}
									title='unStash eBook (download from storage latest stashed book)'
									className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
									onClick={books.unStashEBook}
								/>
								<Copy
									width={33}
									height={33}
									title='download ebook (for validation)'
									className='bg-bordered border-bordered cursor-pointer rounded border-[1px] p-1.5'
									onClick={() => {
										navigator.clipboard.writeText(
											JSON.stringify(
												postProcessingHtml(
													books.state
														.map(book =>
															book.chapters
																.map(chapter => `${chapter.text}`.trim())
																.join('')
														)
														.join('')
												)
											)
										)
									}}
								/>
								<div>
									<HardDriveUpload
										width={33}
										height={33}
										title='Stash eBook (save current book state to storage)'
										className='bg-bordered border-bordered cursor-pointer rounded border-[1px] p-1.5'
										onClick={books.stashEBook}
									/>
								</div>
							</div>
						</div>
						<div
							className='mb-4 w-[80vw] gap-2 overflow-y-scroll'
							style={{
								display: images.length > 0 ? 'flex' : 'none'
							}}>
							{images.map(value => (
								<div key={value.id} className='relative h-max min-w-[250px]'>
									<img
										alt={value.href}
										className='border-bordered relative rounded border-[1px] object-contain '
										width={400}
										height={400}
										src={`data:${value.mimeType};base64,${value.data}`}
									/>

									<div className='bg-muted absolute bottom-0 left-0 right-0 flex w-full  justify-between p-2'>
										<p className='text-wrap	mb-2	whitespace-normal	 break-all'>
											{value.id}
										</p>
										<div className='flex gap-5'>
											<HardDriveUpload
												className='cursor-pointer'
												disabled={value.isUploaded}
												style={{
													opacity: value.isUploaded ? 0.5 : 1
												}}
												onClick={async () => {
													await books.uploadImageToServer({
														imageId: value.id,
														imageAlt: value.href
													})
												}}
											/>

											<Trash
												className='cursor-pointer'
												onClick={() => {
													books.removeImageFromContentById({
														imageId: value.id,
														imageAlt: value.href
													})
												}}
											/>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className='md:flex md:w-fit'>
							{books.state.map((book, bookIndex) => {
								// @ts-ignore
								const bookError = error?.[bookIndex]
								return (
									<div
										key={book.title}
										className='bg-foreground border-bordered mb-4 w-full rounded border-[1px] p-2 pt-4 md:mr-1 md:w-[600px]'>
										<div className='mb-2 flex h-9 items-center  justify-between gap-1'>
											<Input
												variant='muted'
												className='mr-2 h-full w-full flex-1'
												defaultValue={book.title}
												onBlur={event =>
													books.updateBookTitle({
														bookId: book.id,
														value: event.target.value
													})
												}
											/>
											<ErrorMessage message={bookError?.title?.message} />
											<div className='flex items-center gap-2'>
												<Close
													width={33}
													height={33}
													className='bg-muted border-bordered h-full w-[35px] cursor-pointer rounded border-[1px] p-1.5'
													onClick={() => {
														books.delete({
															bookId: book.id
														})
													}}
												/>

												<TrimContentMenu
													onSubmit={data => {
														books.trimmingEBookContent({
															bookId: book.id,
															startLine: data.startLine,
															endLine: data.endLine
														})
													}}
												/>

												<CaseSensitive
													width={33}
													height={33}
													className='bg-muted border-bordered h-full w-[35px] cursor-pointer rounded border-[1px] p-1.5'
													onClick={() => {
														books.generateChapterNames({
															bookId: book.id
														})
														console.log('generate chapters names')
													}}
												/>
											</div>
										</div>
										{book.chapters.map((chapter, chapterIndex) => {
											const chapterError = bookError?.chapters?.[chapterIndex]
											return (
												<div
													key={chapter.id}
													className='bg-muted mb-2 rounded p-2'>
													<div className='mb-2 flex w-full items-center justify-between gap-2'>
														<Input
															variant='foreground'
															value={chapter.name}
															onChange={event => {
																books.updateToc({
																	bookId: book.id,
																	chapterId: chapter.id,
																	value: {
																		name: event.target.value
																	}
																})
															}}
														/>
														<ErrorMessage
															message={chapterError?.name?.message}
														/>
														<div className='flex gap-2'>
															<ChevronUp
																width={34}
																height={34}
																className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
																onClick={() => {
																	if (!book.chapters[chapterIndex - 1]?.id)
																		return errorToast('Cannot move chapter up')
																	books.mergeContentWithTopCharacter({
																		bookId: book.id,
																		insertedContent: chapter.text,

																		topChapterId:
																			book.chapters[chapterIndex - 1]?.id || ''
																	})
																}}
															/>
															<ChevronDown
																width={34}
																height={34}
																className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
																onClick={() => {
																	books.addNewCharacterAfterContent({
																		bookId: book.id,
																		chapterId: chapter.id
																	})
																	console.log('add new character')
																}}
															/>
															<Combine
																width={34}
																height={34}
																className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
																onClick={() => {
																	console.log('combine')
																	books.moveChaptersToNewBook({
																		bookId: book.id,
																		chapterId: chapter.id
																	})
																}}
															/>
															<Close
																width={34}
																height={34}
																className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
																onClick={() => {
																	books.removeToc(book.id, chapter.id)
																	console.log('remove toc')
																}}
															/>
														</div>
													</div>

													<div>
														<TextArea
															value={chapter.text}
															variant='foreground'
															className=' min-h-[250px] w-full rounded px-4 py-2 font-mono text-sm duration-200 ease-linear'
															onChange={event => {
																books.updateToc({
																	chapterId: chapter.id,
																	value: {
																		text: event.target.value
																	},
																	bookId: book.id
																})
															}}
														/>
														<ErrorMessage
															message={chapterError?.text?.message}
														/>
													</div>
												</div>
											)
										})}
									</div>
								)
							})}
						</div>
					</div>
				</div>
			)
		}}
	/>
)

export default EbookComposer
