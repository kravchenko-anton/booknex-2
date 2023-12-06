'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Editor } from '@tinymce/tinymce-react'
import type { FC } from 'react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDebounce } from '../../../../../mobile/src/hooks/useDebounce'
import Button from '../../../../components/button/button'
import Dropzone from '../../../../components/dropzone/dropzone'
import Field from '../../../../components/field/field'
import Select from '../../../../components/select/select'
import { authorService } from '../../../../services/author/author-service'
import { genreService } from '../../../../services/genre/genre-service'
import { parserService } from '../../../../services/parser/parser-services'
import { errorToast } from '../../../../utils/toast'

const Page: FC = () => {
	const { control, handleSubmit, setValue } = useForm<{
		title: string
		picture: File
		pages: number
		genre: string[]
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
	const { mutateAsync: unfold } = useMutation(
		['upload picture'],
		(formData: FormData) => parserService.unfold(formData),
		{
			onError: () => {
				errorToast('Error while uploading picture')
			}
		}
	)

	const [book, setBook] = useState<
		{
			title: string | null
			content: string | null
		}[]
	>()
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
							<h1 className='mb-2 mt-4'>Genres</h1>
							<Select
								isMulti
								options={genre?.map(genre => ({
									label: genre.name,
									value: genre.name
								}))}
								placeholder={'Select genres'}
							/>

							<h1 className='mb-2 mt-4'>Author</h1>
							<Select
								isMulti
								isClearable
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
				className='mx-auto w-[400px]'
				onDropFile={files => {
					for (const file of files) {
					}
				}}
			/>
			<Button className='mt-8' type='submit' color='primary'>
				Create
			</Button>
		</form>
	)
}

export default Page
