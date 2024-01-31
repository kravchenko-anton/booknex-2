import { TextArea } from '@/shared/ui'
import { CaseSensitive, ChevronDown, ChevronUp, Close } from 'icons'
import type { FC } from 'react'

//TODO: сделать тут типизацию
interface EbookComposerProperties {
	state: any
	updateChapterTitle: any
	generateChaptersNames: any
	updateTocTitle: any
	updateTocContent: any
	addNewCharacterAfterContent: any
	removeToc: any
	mergeContentWithTopCharacter: any
}

const EbookComposer: FC<EbookComposerProperties> = books => {
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
		</>
	)
}

export default EbookComposer
