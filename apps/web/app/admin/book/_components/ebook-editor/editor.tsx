import { TrimContentMenu } from '@/app/admin/book/_components/ebook-editor/trim-content-menu'
import { useBookCompose } from '@/app/admin/book/_components/ebook-editor/useBookCompose'
import { DropZone, ErrorMessage, Input, TextArea } from '@/components/ui'
import { errorToast } from '@/utils/toast'
import { BaseFieldProperties } from 'global/types'
import { CaseSensitive, ChevronDown, ChevronUp, Close, Combine } from 'icons'
import { Controller } from 'react-hook-form'

const EbookComposer = <T extends Record<string, any>>({
	control,
	name
}: BaseFieldProperties<T>) => (
	<Controller
		control={control}
		name={name}
		render={({ field: { value = [], onChange }, formState: { errors } }) => {
			console.log(errors)
			const { books } = useBookCompose({
				ebooks: value,
				setEBooks: onChange
			})

			return (
				<>
					<div className='md:w-max md:overflow-y-scroll '>
						<div>
							<div className='mb-4'>
								<h1 className='mt-2  text-xl'>Book file</h1>
								<DropZone
									multiple
									size='sm'
									accept='.epub'
									disabled={books.unfoldLoading}
									onDropFile={files => {
										books.upload(files)
									}}
									onFileDelete={(_file, index) => {
										books.delete({
											bookId: Number(books.state[index]?.id)
										})
									}}
								/>
							</div>

							<div className='md:flex md:w-fit'>
								{books.state.map(book => (
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

											<div className='flex items-center gap-2'>
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
										{book.chapters.map((chapter, index) => (
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
													<div className='flex gap-2'>
														<ChevronUp
															width={34}
															height={34}
															className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
															onClick={() => {
																if (!book.chapters[index - 1]?.id)
																	return errorToast('Cannot move chapter up')
																books.mergeContentWithTopCharacter({
																	bookId: book.id,
																	insertedContent: chapter.text,

																	topChapterId: Number(
																		book.chapters[index - 1]?.id
																	)
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
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					</div>
					<ErrorMessage name={name} errors={errors} />
				</>
			)
		}}
	/>
)

export default EbookComposer
