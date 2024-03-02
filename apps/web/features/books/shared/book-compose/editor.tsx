import { DropZone, TextArea } from '@/components/ui'
import { useBookCompose } from '@/features/books/shared/book-compose/useBookCompose'
import { errorToast } from '@/utils/toast'
import type { EBookType } from 'global/api-client'
import { CaseSensitive, ChevronDown, ChevronUp, Close } from 'icons'
import { useEffect, type FC } from 'react'

//TODO: сделать тут типизацию

const EbookComposer: FC<{
	defaultBooks?: EBookType[]
	updateBooks: (books: EBookType[]) => void
}> = ({ updateBooks, defaultBooks }) => {
	const { books } = useBookCompose(defaultBooks)
	useEffect(() => updateBooks(books.state), [books.state])
	if (!books) return null
	console.log(books.state, 'book compose in editor')
	return (
		<>
			<div className='mb-4'>
				<h1 className='mt-2  text-xl'>Book file</h1>
				<DropZone
					multiple
					size='sm'
					accept='.epub'
					onDropFile={files => {
						books.upload(files)
					}}
					onFileDelete={(_skip, index) => {
						books.delete({
							bookId: books.state[index].id
						})
					}}
				/>
			</div>
			<div className=' flex gap-2 overflow-scroll'>
				{books.state.map(book => (
					<div
						key={book.title}
						className='bg-foreground mb-4 mr-1   w-[600px]  rounded-xl p-3'
					>
						<div className='mb-4 flex items-center  justify-between gap-2'>
							<input
								defaultValue={book.title}
								className='bg-muted hover:border-foreground focus:border-foreground focus:shadow-outline h-full w-full  rounded-xl border-2  border-transparent px-4 py-3 text-sm text-white  placeholder-white duration-200 ease-linear focus:outline-0'
								onBlur={event =>
									books.updateChapterTitle({
										bookId: book.id,
										value: event.target.value
									})
								}
							/>
							<CaseSensitive
								width={45}
								height={45}
								className='bg-muted cursor-pointer rounded-xl p-2'
								onClick={() => {
									books.generateChaptersNames({
										bookId: book.id
									})
									console.log('generate chapters names')
								}}
							/>
						</div>
						{book.chapters.map((chapter, index) => (
							<div key={chapter.id} className='bg-muted m-2 rounded-xl p-2'>
								<div className='mb-2 flex w-full items-center justify-between gap-2'>
									<input
										value={chapter.name}
										className='bg-foreground border-gray w-full rounded-xl border-0 px-4 py-2 text-sm text-white placeholder-white  outline-0 duration-200 ease-linear focus:border-2'
										onChange={event => {
											books.updateTocTitle({
												bookId: book.id,
												chapterId: chapter.id,
												value: event.target.value
											})
										}}
									/>
									<div className='flex gap-2'>
										<ChevronUp
											width={36}
											height={36}
											className='bg-muted cursor-pointer rounded-xl p-2'
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
											className='bg-muted cursor-pointer rounded-xl p-2'
											onClick={() => {
												books.addNewCharacterAfterContent({
													bookId: book.id,
													chapterId: chapter.id
												})
												console.log('add new character')
											}}
										/>
										<Close
											width={36}
											height={36}
											className='bg-muted cursor-pointer rounded-xl p-2'
											onClick={() => {
												books.removeToc(book.title, chapter.id)
												console.log('remove toc')
											}}
										/>
									</div>
								</div>

								<TextArea
									value={chapter.text}
									variant='background'
									className=' min-h-[340px] w-full rounded-xl border-0 px-4 py-2 font-mono text-sm duration-200 ease-linear'
									onChange={event => {
										books.updateTocContent({
											chapterId: chapter.id,
											value: event.target.value,
											bookId: book.id
										})
									}}
								/>
							</div>
						))}
					</div>
				))}
			</div>
		</>
	)
}

export default EbookComposer
