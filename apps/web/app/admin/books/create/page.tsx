'use client'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Close } from '../../../../../../libs/global/icons/react'
import Button from '../../../../components/button/button'
import Dropzone from '../../../../components/dropzone/dropzone'
import Field from '../../../../components/field/field'
import Select from '../../../../components/select/select'
import TextEditor from '../../../../components/text-editor/text-editor'
import { useBookCompose } from './useBook'
import { useCreate } from './useCreate'

const Page: FC = () => {
	const {
		books,
		deleteBook,
		updateTocContent,
		updateTocTitle,
		updateCharacterTitle,
		removeToc,
		uploadBook
	} = useBookCompose()
	const {
		unfold,
		control,
		handleSubmit,
		setValue,
		genre,
		setAuthorSearch,
		authors
	} = useCreate()

	return (
		<form
			onSubmit={handleSubmit(data => {
				console.log(data)
			})}>
			<h1 className='mb-4 text-center text-3xl font-medium'>
				Create book from scratch
			</h1>
			<div className=' flex justify-between gap-5'>
				<div className='w-1/2'>
					<div className='mt-2 flex justify-between gap-3'>
						<Field
							control={control}
							className='w-1/2'
							name={'title'}
							placeholder='Title'
						/>
						<Field
							type={'number'}
							control={control}
							name={'pages'}
							placeholder='Pages'
						/>
						<Field
							type={'number'}
							control={control}
							name={'likedPercentage'}
							placeholder={'Liked Percentage'}
						/>
						<Field
							type={'number'}
							control={control}
							className='mb-2'
							name={'popularity'}
							placeholder={'Popularity'}
						/>
					</div>
					<div className='flex justify-between gap-6'>
						<div className='w-1/2'>
							<h1 className='mb-2'>Picture</h1>
							<Dropzone
								size='lg'
								onDropFile={acceptedFiles => {
									setValue('picture', acceptedFiles[0])
								}}
							/>
							<h1 className='mb-2 mt-4 flex gap-5'>
								Genres <p className='text-gray'>First genre be main</p>
							</h1>
							<Controller
								control={control}
								name={'genres'}
								render={({
									field: { value, onChange, onBlur },
									fieldState: { error }
								}) => (
									<>
										<Select
											value={value}
											onBlur={onBlur}
											onChange={onChange}
											isMulti
											options={genre?.map(genre => ({
												label: genre.name,
												value: genre.name
											}))}
											placeholder={'Select genres'}
										/>
										{!!error && (
											<p className={`text-danger mt-0.5 text-xs italic`}>
												{error.message}
											</p>
										)}
									</>
								)}
							/>
						</div>
						<div className='w-1/2'>
							<h1 className='mt-2  text-xl'>Book file</h1>
							<Dropzone
								size='lg'
								options={{
									multiple: true,
									accept: {
										'application/epub+zip': ['.epub']
									}
								}}
								onFileDelete={file => deleteBook(file.name)}
								onDropFile={files => {
									for (const file of files) {
										const formData = new FormData()
										formData.append(
											'file',
											new Blob([file], { type: 'application/epub+zip' })
										)
										unfold(formData).then(data => {
											uploadBook(file.name, data)
										})
									}
								}}
							/>
							<div className='mb-2 mt-4 flex gap-3'>
								<h1 className=''>Author</h1>
								<Button size='sm'>Create</Button>
							</div>

							<Select
								options={authors?.map(author => ({
									label: author.name,
									value: author.name
								}))}
								onBlur={value => {
									setAuthorSearch(value.target.value)
								}}
								isSearchable
								placeholder={'Select author'}
							/>
						</div>
					</div>
				</div>
				<div className='h-max w-1/2'>
					<Controller
						control={control}
						name={'description'}
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error }
						}) => (
							<>
								<h1 className='mb-2'>Description</h1>
								<TextEditor
									value={value}
									onBlur={onBlur}
									onChange={onChange}
									placeholder='Enter description'
									className='h-[300px]'
								/>
								{!!error && (
									<p className={`text-danger mt-0.5 text-xs italic`}>
										{error.message}
									</p>
								)}
							</>
						)}
					/>
				</div>
			</div>

			{books && (
				<div className='mt-14  grid grid-cols-2 gap-2'>
					{books.map(book => (
						<div
							key={book.name}
							className='bg-foreground mb-4 mr-1 rounded-xl p-3'>
							<input
								onBlur={event => {
									updateCharacterTitle(event.target.value, book.name)
								}}
								defaultValue={book.name}
								className={`bg-vibrant hover:border-foreground focus:border-foreground focus:shadow-outline mb-4 w-full  rounded-md border-2  border-transparent px-4 py-3 text-sm text-white  placeholder-white duration-200 ease-linear focus:outline-0`}
							/>
							{book.content.map(content => (
								<div className='bg-shade m-2 rounded-lg p-2'>
									<div
										key={content.title + book.name}
										className='mb-2 flex w-full items-center justify-between gap-2'>
										<input
											defaultValue={content.title}
											onBlur={event => {
												updateTocTitle(
													content.title,
													book.name,
													event.target.value
												)
											}}
											className={`bg-foreground border-gray w-full rounded-md border-0 px-4 py-2 text-sm text-white placeholder-white  outline-0 duration-200 ease-linear focus:border-2`}
										/>
										<div className='flex gap-2'>
											<Close
												width={36}
												height={36}
												onClick={() => {
													removeToc(book.name, content.title)
												}}
												className='bg-vibrant cursor-pointer rounded-xl p-2'
											/>
										</div>
									</div>
									<TextEditor
										value={content.content}
										onBlur={event => {
											updateTocContent(
												content.title,
												book.name,
												event.target.value
											)
										}}
										color='background'
										className='min-h-[340px] w-full rounded-md border-0 px-4 py-2 font-mono text-sm duration-200 ease-linear'
									/>
								</div>
							))}
						</div>
					))}
				</div>
			)}
			<Button className='mt-8' type='submit' color='primary'>
				Create
			</Button>
		</form>
	)
}

export default Page
