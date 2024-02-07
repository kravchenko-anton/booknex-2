import type { BookComposeReturnType } from '@/app/admin/books/_shared/useBookCompose'
import { TextArea } from '@/components/ui'
import { CaseSensitive, ChevronDown, ChevronUp, Close } from 'icons'
import type { FC } from 'react'

//TODO: сделать тут типизацию

const EbookComposer: FC<BookComposeReturnType> = books => {
	if (!books.state) return null
	return (
		<>
			{books.state.map((book, index) => (
				<div
					key={book.name + index}
					className='bg-foreground mb-4 mr-1 rounded-xl p-3'
				>
					<div className='mb-4 flex items-center  justify-between gap-2'>
						<input
							defaultValue={book.name}
							className='bg-muted hover:border-foreground focus:border-foreground focus:shadow-outline h-full w-full  rounded-xl border-2  border-transparent px-4 py-3 text-sm text-white  placeholder-white duration-200 ease-linear focus:outline-0'
							onBlur={event =>
								books.updateChapterTitle(event.target.value, book.name)
							}
						/>
						<CaseSensitive
							width={45}
							height={45}
							className='bg-muted cursor-pointer rounded-xl p-2'
							onClick={() => {
								books.generateChaptersNames(book.name)
								console.log('generate chapters names')
							}}
						/>
					</div>
					{book.content.map((content, index) => (
						<div key={content.id} className='bg-muted m-2 rounded-xl p-2'>
							<div className='mb-2 flex w-full items-center justify-between gap-2'>
								<input
									value={content.title}
									className='bg-foreground border-gray w-full rounded-xl border-0 px-4 py-2 text-sm text-white placeholder-white  outline-0 duration-200 ease-linear focus:border-2'
									onChange={event => {
										books.updateTocTitle(
											content.id,
											book.name,
											event.target.value
										)
									}}
								/>
								<div className='flex gap-2'>
									<ChevronUp
										width={36}
										height={36}
										className='bg-muted cursor-pointer rounded-xl p-2'
										onClick={() => {
											books.mergeContentWithTopCharacter({
												bookName: book.name,
												insertedContent: content.content,
												topChapterId: book.content[index - 1].id
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
												bookName: book.name,
												afterContent: content.content
											})
											console.log('add new character')
										}}
									/>
									<Close
										width={36}
										height={36}
										className='bg-muted cursor-pointer rounded-xl p-2'
										onClick={() => {
											books.removeToc(book.name, content.id)
											console.log('remove toc')
										}}
									/>
								</div>
							</div>

							<TextArea
								value={content.content}
								variant='background'
								className='min-h-[340px] w-full rounded-xl border-0 px-4 py-2 font-mono text-sm duration-200 ease-linear'
								onChange={event => {
									books.updateTocContent(
										book.name,
										content.id,
										event.target.value
									)
								}}
							/>
						</div>
					))}
				</div>
			))}
		</>
	)
}

export default EbookComposer
