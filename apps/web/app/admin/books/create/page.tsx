'use client'
import SelectGenres from '@/features/books/create/select-genres'
import { useBookCompose } from '@/features/books/create/useBookCompose'
import { useCreateForm } from '@/features/books/create/useForm'
import {
	Button,
	DropZone,
	ErrorMessage,
	Field,
	FormTextArea,
	TextArea
} from '@/shared/ui'
import { CaseSensitive, ChevronDown, ChevronUp, Close } from 'icons'
import type { FC } from 'react'

const Page: FC = () => {
	const { books } = useBookCompose()
	const form = useCreateForm()
	return (
		<div>
			<h1 className='mb-4 text-center text-3xl font-medium'>Create book</h1>
			<div className=' flex justify-between gap-5'>
				<div className='w-11/12'>
					<div className='mt-2 flex justify-between gap-3'>
						<div className='w-1/3'>
							<h1 className='mb-2'>Title</h1>
							<Field
								type='text'
								control={form.control}
								name='title'
								placeholder='Title'
							/>
						</div>
						<div className='w-1/3'>
							<h1 className='mb-2'>Author</h1>
							<Field
								type='text'
								control={form.control}
								name='author'
								placeholder='Author'
							/>
						</div>

						<div>
							<h1 className='mb-2'>Pages</h1>
							<Field
								type='number'
								control={form.control}
								name='pages'
								placeholder='Pages'
							/>
						</div>
						<div>
							<h1 className='mb-2'>Popularity</h1>
							<Field
								type='number'
								control={form.control}
								name='popularity'
								placeholder='Popularity'
							/>
						</div>
					</div>
					<h1 className='mb-2 mt-4'>Description</h1>
					<FormTextArea
						control={form.control}
						name='description'
						placeholder='Enter description'
						className='h-[250px]'
					/>
				</div>

				<div>
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
						<ErrorMessage name='books' errors={form.errors} />
					</div>
					<div>
						<h1 className='mt-2  text-xl'>Cover</h1>
						<DropZone
							size='md'
							multiple={false}
							accept='image/*'
							onDropFile={acceptedFiles => {
								form.setValue('picture', {
									name: acceptedFiles[0].name,
									blob: new Blob([acceptedFiles[0]])
								})
							}}
						/>
						<ErrorMessage name='picture' errors={form.errors} />
					</div>
					<SelectGenres
						selectedGenres={form.watch('genres') || []}
						setSelectedGenres={genres => form.setValue('genres', genres)}
					/>
					<ErrorMessage name='genres' errors={form.errors} />
				</div>
			</div>

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

			<Button
				size='md'
				className='mt-4'
				onClick={() => {
					form.setValue('books', books.state)
					form.submitBook()
				}}
				variant='primary'
			>
				Create
			</Button>
		</div>
	)
}

export default Page
