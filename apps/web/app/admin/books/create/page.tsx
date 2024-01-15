'use client'
import CreateAuthorPopup from '@/app/admin/authors/popup/create'
import {
	Button,
	DropZone,
	ErrorBlock,
	Field,
	FormAsyncSelect,
	FormSelect,
	FormTextArea,
	TextArea
} from '@/components/ui'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger
} from '@/components/ui/sheet'
import { blobFormData } from '@/utils/files'
import { Color } from 'global/colors'
import {
	CaseSensitive,
	ChevronDown,
	ChevronUp,
	Close
} from 'global/icons/react'
import type { FC } from 'react'
import { useBookCompose } from './useBook'
import { useCreate } from './useCreate'

const Page: FC = () => {
	const { books, chapters } = useBookCompose()
	const { unfold, select, form } = useCreate()
	return (
		<Sheet>
			<div>
				<h1 className='mb-4 text-center text-3xl font-medium'>Create book</h1>
				<div className=' flex justify-between gap-5'>
					<div className='w-1/2'>
						<div className='mt-2 flex justify-between gap-3'>
							<Field
								control={form.control}
								className='w-1/2'
								name='title'
								placeholder='Title'
							/>

							<Field
								type='number'
								control={form.control}
								name='pages'
								placeholder='Pages'
							/>
							<Field
								type='number'
								control={form.control}
								name='popularity'
								placeholder='Popularity'
							/>
						</div>
						<h1 className='mb-2 mt-4'>Description</h1>
						<FormTextArea
							control={form.control}
							name='description'
							placeholder='Enter description'
							className='h-[250px]'
						/>
					</div>

					<div className='h-max w-1/2'>
						<div className='flex justify-between gap-6'>
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
									onDropFile={files => {
										for (const file of files) {
											unfold(blobFormData(new Blob([file]), file.name)).then(
												data => {
													books.upload({
														name: file.name,
														content: data
													})
												}
											)
										}
									}}
								/>
								<ErrorBlock
									name='books'
									errors={form.errors}
									render={({ message }) => (
										<p className='text-danger text-md mt-2 italic'>{message}</p>
									)}
								/>
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
								<ErrorBlock
									name='picture'
									errors={form.errors}
									render={({ message }) => (
										<p className='text-danger text-md mt-2 italic'>{message}</p>
									)}
								/>
							</div>
						</div>
						<div className='flex justify-between gap-6'>
							<div className='w-1/2'>
								<h1 className='mb-2 mt-4 flex gap-5'>
									Genres <p className='text-gray'>First genre be main</p>
								</h1>
								<FormSelect
									control={form.control}
									name='genres'
									isMulti
									options={select.genres?.map(genre => {
										return {
											label: genre.name,
											value: genre.id
										}
									})}
									isSearchable
									placeholder='Select genres'
								/>
							</div>
							<div className='w-1/2'>
								<div className='mb-2 mt-4 flex gap-3'>
									<h1>Author</h1>
									<SheetTrigger>
										<Button size='sm'>Create</Button>
									</SheetTrigger>
								</div>
								<FormAsyncSelect
									control={form.control}
									name='author'
									isLoading={select.author.loading}
									loadOptions={authorSearch =>
										select.author.load(authorSearch).then(data =>
											data.map(author => {
												return {
													label: author.name,
													value: author.id
												}
											})
										)
									}
									isSearchable
									placeholder='Select author'
								/>
							</div>
						</div>
					</div>
				</div>

				{books.state && (
					<div>
						<div className='mt-14  grid grid-cols-2 gap-2'>
							{books.state.map((book, index) => (
								<div
									key={book.name + index}
									className='bg-foreground mb-4 mr-1 rounded-xl p-3'
								>
									<div className='mb-4 flex items-center  justify-between gap-2'>
										<input
											onChange={event =>
												books.updateChapterTitle(event.target.value, book.name)
											}
											value={book.name}
											className='bg-vibrant hover:border-foreground focus:border-foreground focus:shadow-outline h-full w-full  rounded-xl border-2  border-transparent px-4 py-3 text-sm text-white  placeholder-white duration-200 ease-linear focus:outline-0'
										/>
										<CaseSensitive
											width={45}
											height={45}
											onClick={() => {
												books.generateChaptersNames(book.name)
												console.log('generate chapters names')
											}}
											className='bg-vibrant cursor-pointer rounded-xl p-2'
										/>
									</div>
									{book.content.map((content, index) => (
										<div
											key={content.id}
											className='bg-shade m-2 rounded-xl p-2'
										>
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
														className='bg-vibrant cursor-pointer rounded-xl p-2'
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
														className='bg-vibrant cursor-pointer rounded-xl p-2'
													/>
													<Close
														width={36}
														height={36}
														onClick={() => {
															books.removeToc(book.name, content.id)
															console.log('remove toc')
														}}
														className='bg-vibrant cursor-pointer rounded-xl p-2'
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
						<ErrorBlock
							name='books'
							errors={form.errors}
							render={({ message }) => <p color={Color.danger}>{message}</p>}
						/>
					</div>
				)}
				<Button
					size='md'
					className='mt-8'
					onClick={() => {
						if (!books.state) return
						form.setValue('books', books.state)
						form.setValue('chapters', chapters)
						form.submitBook()
					}}
					variant='primary'
				>
					Create
				</Button>
			</div>
			<SheetContent>
				<SheetHeader>
					<h1 className='text-2xl font-medium'>Create author</h1>
				</SheetHeader>
				<CreateAuthorPopup
					onCreate={({ id, name }) => {
						form.setValue('author', {
							label: name,
							value: id
						})
					}}
				/>
			</SheetContent>
		</Sheet>
	)
}

export default Page
