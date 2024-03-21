import { useBookCompose } from '@/app/admin/book/_shared/book-editor/useBookCompose'
import { DropZone, TextArea } from '@/components/ui'
import { errorToast } from '@/utils/toast'
import type { PayloadEBook } from 'global/api-client'
import { CaseSensitive, ChevronDown, ChevronUp, Close, Combine } from 'icons'
import { useEffect, type FC } from 'react'

interface EbookComposerProperties {
	defaultBooks?: PayloadEBook[]
	updateBooks: (books: PayloadEBook[]) => void
}

//TODO: сделать отдельный компонент формы где я смогу выбрать откуда по куда я смогу обрезать текст во всех inpuтах
const EbookComposer: FC<EbookComposerProperties> = ({
	updateBooks,
	defaultBooks
}) => {
	const { books } = useBookCompose(defaultBooks)
	useEffect(() => updateBooks(books.state), [books.state])
	if (!books) return null
	console.log(books.state, 'book compose in editor')
	return (
		<div className='md:w-max md:overflow-y-scroll '>
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
							bookId: books.state[index].id
						})
					}}
				/>
			</div>

			<div className=' md:flex md:w-fit '>
				{books.state.map(book => (
					<div
						key={book.title}
						className='bg-foreground mb-4 w-full rounded-lg p-2 md:mr-1 md:w-[600px]'
					>
						<div className='mb-4 flex items-center  justify-between gap-1'>
							<input
								defaultValue={book.title}
								className='bg-muted hover:border-foreground focus:border-foreground focus:shadow-outline h-full w-full  rounded-lg border-2  border-transparent px-4 py-3 text-sm text-white  placeholder-white duration-200 ease-linear focus:outline-0'
								onBlur={event =>
									books.updateBookTitle({
										bookId: book.id,
										value: event.target.value
									})
								}
							/>
							<CaseSensitive
								width={45}
								height={45}
								className='bg-muted cursor-pointer rounded-lg p-2'
								onClick={() => {
									books.generateChapterNames({
										bookId: book.id
									})
									console.log('generate chapters names')
								}}
							/>
						</div>
						{book.chapters.map((chapter, index) => (
							<div key={chapter.id} className='bg-muted mb-2 rounded-lg p-2'>
								<div className='mb-2 flex w-full items-center justify-between gap-2'>
									<input
										value={chapter.name}
										className='bg-foreground border-gray bomder-0 w-full rounded-lg px-4 py-2 text-sm text-white placeholder-white  outline-0 duration-200 ease-linear focus:border-2'
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
											width={36}
											height={36}
											className='bg-muted cursor-pointer rounded-lg p-2'
											onClick={() => {
												if (!book.chapters[index - 1])
													return errorToast("Can't move up")
												books.mergeContentWithTopCharacter({
													bookId: book.id,
													insertedContent: chapter.text,
													topChapterId: book.chapters[index - 1].id
												})
												console.log('merge with top character')
											}}
										/>
										<ChevronDown
											width={36}
											height={36}
											className='bg-muted cursor-pointer rounded-lg p-2'
											onClick={() => {
												books.addNewCharacterAfterContent({
													bookId: book.id,
													chapterId: chapter.id
												})
												console.log('add new character')
											}}
										/>
										<Combine
											width={36}
											height={36}
											className='bg-muted cursor-pointer rounded-lg p-2'
											onClick={() => {
												console.log('combine')
												books.moveChaptersToNewBook({
													bookId: book.id,
													chapterId: chapter.id
												})
											}}
										/>
										<Close
											width={36}
											height={36}
											className='bg-muted cursor-pointer rounded-lg p-2'
											onClick={() => {
												books.removeToc(book.id, chapter.id)
												console.log('remove toc')
											}}
										/>
									</div>
								</div>

								<TextArea
									value={chapter.text}
									variant='background'
									className=' bomder-0 min-h-[340px] w-full rounded-lg px-4 py-2 font-mono text-sm duration-200 ease-linear'
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
	)
}

export default EbookComposer
