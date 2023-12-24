'use client'
import { ChevronDown, Close, Plus } from '@/global/icons/react'
import { Color } from '@/ui/colors'
import {
	Button,
	DropZone,
	ErrorBlock,
	Field,
	FormAsyncSelect,
	FormDropZone,
	FormSelect,
	FormTextArea,
	TextArea
} from '@/ui/components'
import { blobFormData } from '@/utils/files'
import type { FC } from 'react'

import CreateAuthorPopup from '../../authors/popup/create'
import { useCreate } from './useCreate'

const Page: FC = () => {
	const { unfold, select, popup, form } = useCreate()
	return (
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
								onFileDelete={file => {
									form.setValue('books', booksFunctions.remove(file.name))
								}}
								onDropFile={files => {
									for (const file of files) {
										unfold(blobFormData(new Blob([file]), file.name)).then(
											data => {
												booksFunctions.upload(file.name, data)
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
							<FormDropZone
								control={form.control}
								name='picture'
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
								<Button
									onClick={() =>
										popup.show(
											<CreateAuthorPopup
												onCreate={({ id, name }) => {
													popup.close()
													form.setValue('author', {
														label: name,
														value: id
													})
												}}
											/>
										)
									}
									size='sm'
								>
									Create
								</Button>
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

			{books && (
				<div>
					<div className='mt-14  grid grid-cols-2 gap-2'>
						{books.map((book, index) => (
							<div
								key={book.name + index}
								className='bg-foreground mb-4 mr-1 rounded-md p-3'
							>
								<div className='mb-4 flex items-center  justify-between gap-5'>
									<input
										onBlur={event =>
											booksFunctions.updateCharacterTitle(
												event.target.value,
												book.name
											)
										}
										defaultValue={book.name}
										className='bg-vibrant hover:border-foreground focus:border-foreground focus:shadow-outline h-full w-full  rounded-md border-2  border-transparent px-4 py-3 text-sm text-white  placeholder-white duration-200 ease-linear focus:outline-0'
									/>
									<Plus
										width={45}
										height={45}
										onClick={() => {
											booksFunctions.addNewCharacter(book.name)
										}}
										className='bg-vibrant cursor-pointer rounded-md p-2'
									/>
								</div>
								{book.content.map((content, index) => (
									<div
										key={content.}
										className='bg-shade m-2 rounded-md p-2'
									>
										<div className='mb-2 flex w-full items-center justify-between gap-2'>
											<input
												defaultValue={content.title}
												onBlur={event => {
													booksFunctions.updateTocTitle(
														content.content,
														book.name,
														event.target.value
													)
												}}
												className='bg-foreground border-gray w-full rounded-md border-0 px-4 py-2 text-sm text-white placeholder-white  outline-0 duration-200 ease-linear focus:border-2'
											/>
											<div className='flex gap-2'>
												<ChevronDown
													width={36}
													height={36}
													onClick={() => {
														// create a new character
													}}
													className='bg-vibrant cursor-pointer rounded-md p-2'
												/>
												<Close
													width={36}
													height={36}
													onClick={() => {
														booksFunctions.removeToc(book.name, content.content)
													}}
													className='bg-vibrant cursor-pointer rounded-md p-2'
												/>
											</div>
										</div>

										<TextArea
											defaultValue={content.content}
											onBlur={event => {
												booksFunctions.updateTocContent(
													content.title,
													book.name,
													event.target.value
												)
											}}
											variant='background'
											className='min-h-[340px] w-full rounded-md border-0 px-4 py-2 font-mono text-sm duration-200 ease-linear'
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
				className='mt-8'
				onClick={() => {
					if (!books) return
					form.setValue('books', books)
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
