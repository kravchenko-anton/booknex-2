'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Editor } from '@tinymce/tinymce-react'
import type { FC } from 'react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Close, Pen } from '../../../../../../libs/global/icons/react'
import { useDebounce } from '../../../../../mobile/src/hooks/useDebounce'
import Button from '../../../../components/button/button'
import Dropzone from '../../../../components/dropzone/dropzone'
import Field from '../../../../components/field/field'
import Select from '../../../../components/select/select'
import { authorService } from '../../../../services/author/author-service'
import { genreService } from '../../../../services/genre/genre-service'
import { parserService } from '../../../../services/parser/parser-services'
import { errorToast, successToast } from '../../../../utils/toast'

const Page: FC = () => {
	const { control, handleSubmit, setValue } = useForm<{
		title: string
		picture: File
		pages: number
		genres: string[]
		author: string
		file: {
			file: File
			characters: {
				name: string
				link: string
			}[]
		}
		popularity: number
		color: string
		likedPercentage: number
		description: string
	}>()
	const [authorSearch, setAuthorSearch] = useState('')
	const seachAuthor = useDebounce(authorSearch, 500)
	const { data: genre } = useQuery(['genres'], () => genreService.all())
	const { data: authors } = useQuery(['authors'], () =>
		authorService.all(seachAuthor)
	)

	const [books, setBooks] = useState<
		{
			name: string
			filePath: string
			content: {
				title: string

				content: string
			}[]
		}[]
	>()
	const { mutateAsync: unfold } = useMutation(
		['upload ebook'],
		(formData: FormData) => parserService.unfold(formData),
		{
			onSuccess: () => {
				successToast('File uploaded')
			},
			onError: () => {
				errorToast('Error while uploading book')
			}
		}
	)

	return (
		<form
			onSubmit={handleSubmit(data => {
				console.log(data)
			})}>
			<h1 className='mb-4 text-center text-3xl font-medium'>
				Create book from scratch
			</h1>
			<div className='flex  justify-between gap-10'>
				<div className='w-1/2'>
					<Field
						control={control}
						rules={{
							required: 'Title is required',
							minLength: {
								value: 3,
								message: 'Title must be at least 3 characters long'
							}
						}}
						name={'title'}
						placeholder='Title'
					/>
					<div className='mt-2 flex  justify-between'>
						<Field
							type={'number'}
							control={control}
							rules={{
								required: 'Pages is required',
								min: {
									value: 1,
									message: 'Pages must be greater than 0'
								}
							}}
							name={'pages'}
							placeholder='Pages'
						/>
						<Field
							type={'number'}
							rules={{
								required: 'Liked Percentage is required',
								min: {
									value: 1,
									message: 'Liked Percentage must be greater than 0'
								},
								max: {
									value: 100,
									message: 'Liked Percentage must be less than 100'
								}
							}}
							control={control}
							name={'likedPercentage'}
							placeholder={'Liked Percentage'}
						/>
						<Field
							type={'number'}
							control={control}
							rules={{
								required: 'Popularity is required',
								min: {
									value: 1,
									message: 'Popularity must be greater than 0'
								},
								max: {
									value: 100,
									message: 'Popularity must be less than 100'
								}
							}}
							className='mb-2'
							name={'popularity'}
							placeholder={'Popularity'}
						/>
					</div>
					<div className='flex justify-between gap-6'>
						<div className='w-1/2'>
							<h1 className='mb-2'>Picture</h1>
							<Dropzone
								className='h-[140px]'
								onDropFile={acceptedFiles => {
									setValue('picture', acceptedFiles[0])
								}}
							/>
						</div>
						<div className='w-1/2'>
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
							<h1 className='mb-2 mt-4'>Author</h1>
							<Controller
								control={control}
								name={'author'}
								rules={{
									required: 'Author required'
								}}
								render={({
									field: { value, onChange, onBlur },
									fieldState: { error }
								}) => (
									<>
										<Select
											value={value}
											onBlur={onBlur}
											onChange={onChange}
											options={authors?.map(author => ({
												label: author.name,
												value: author.name
											}))}
											onInputChange={value => {
												setAuthorSearch(value)
											}}
											isSearchable
											placeholder={'Select author'}
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
				</div>
				<div className='w-1/2'>
					<Controller
						control={control}
						name={'description'}
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error }
						}) => (
							<>
								<h1 className='mb-2'>Description</h1>
								<Editor
									value={value}
									onBlur={onBlur}
									onChange={onChange}
									apiKey={process.env.TINYMCE}
									init={{
										height: 300,
										skin: 'oxide-dark',
										content_css: 'dark',
										plugins:
											'anchor autolink charmap codesample preview lists media searchreplace  visualblocks wordcount checklist mediaembed casechange pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
										toolbar:
											'undo redo | blocks  fontsize | bold italic underline strikethrough  align lineheight |  removeformat'
									}}
									initialValue='This is the initial content of the editor.'
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

			<h1 className='my-5 text-center text-3xl'>Book file</h1>
			<Dropzone
				options={{
					multiple: true,
					accept: {
						'application/epub+zip': ['.epub']
					}
				}}
				className='mx-auto w-[400px]'
				onFileDelete={file => {
					setBooks(previous => {
						return previous?.filter(book => book.filePath !== file.path)
					})
				}}
				onDropFile={files => {
					for (const file of files) {
						const formData = new FormData()
						formData.append(
							'file',
							new Blob([file], { type: 'application/epub+zip' })
						)
						unfold(formData).then(data => {
							console.log(data, file)
							setBooks(previous => {
								if (previous)
									return [
										...previous,
										{
											name: file.name,
											filePath: file.path,
											content: data
										}
									]
								return [
									{
										name: file.name,
										filePath: file.path,
										content: data
									}
								]
							})
						})
					}
				}}
			/>
			{books && (
				<div className='mt-4 flex grid grid-cols-2 gap-5'>
					{books.map(book => (
						<div
							key={book.name}
							className='bg-foreground mb-4 mr-1 rounded-xl p-3'>
							<input
								onChange={event => {
									setBooks(previous => {
										if (previous) {
											return previous.map(previousBook => {
												if (previousBook.filePath === book.filePath) {
													return {
														...previousBook,
														name: event.target.value
													}
												}
												return previousBook
											})
										}
										return previous
									})
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
											className={`bg-foreground border-gray w-full rounded-md border-0 px-4 py-2 text-sm text-white placeholder-white  outline-0 duration-200 ease-linear focus:border-2`}
										/>
										<div className='flex gap-2'>
											<Pen
												width={36}
												height={36}
												className='bg-primary cursor-pointer rounded-xl px-2'
											/>
											<Close
												width={36}
												height={36}
												onClick={() => {
													setBooks(previous => {
														if (previous) {
															return previous.map(previousBook => {
																if (previousBook.filePath === book.filePath) {
																	return {
																		...previousBook,
																		content: previousBook.content.filter(
																			previousContent =>
																				previousContent.title !== content.title
																		)
																	}
																}
																return previousBook
															})
														}
														return previous
													})
												}}
												className='bg-vibrant cursor-pointer rounded-xl p-2'
											/>
										</div>
									</div>
									<pre className='text-gray mb-2 font-mono'>
										<code>
											{content.content.length > 400
												? content.content.slice(0, 400) + '...'
												: content.content}
										</code>
									</pre>
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
