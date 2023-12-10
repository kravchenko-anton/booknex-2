'use client'
import { useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { useEffect } from 'react'
import { Close } from '../../../../../../libs/global/icons/react'
import Button from '../../../../components/button/button'
import Dropzone from '../../../../components/dropzone/dropzone'
import FormDropzone from '../../../../components/dropzone/form-dropzone'
import { ErrorMessage } from '../../../../components/error-block/error-block'
import Field from '../../../../components/field/field'
import FormAsyncSelect from '../../../../components/select/async/form-select'
import FormSelect from '../../../../components/select/form-select'
import FormTextEditor from '../../../../components/text-editor/form-text-editor'
import TextArea from '../../../../components/text-editor/text-area'
import { errorToast, successToast } from '../../../../utils/toast'
import CreateAuthorPopup from '../../authors/popup/create'
import { useBookCompose } from './useBook'
import { useCreate } from './useCreate'
import type { CreateBookValidationSchemaType } from './validation'

const Page: FC = () => {
	const searchParameters = useSearchParams()

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
		authors,
		authorsLoading,
		showPopup,
		closePopup,
		genres,
		uploadBook: uploadBookApi,
		UploadBookHtml,
		UploadBookPhoto,
		setValue,
		errors
	} = useCreate()
	useEffect(() => {
		if (searchParameters.get('defaultValues')) {
			const defaultValues = JSON.parse(searchParameters.get('defaultValues'))
			setValue('title', defaultValues.title)
			setValue('pages', Number(defaultValues.pages))
			setValue('popularity', Number(defaultValues.popularity))
			setValue('description', defaultValues.description)
			setValue('author', {
				label: defaultValues.author.name,
				value: Number(defaultValues.author.id)
			})
			setValue(
				'genres',
				defaultValues.genres.map(genre => {
					return {
						label: genre.name,
						value: Number(genre.id)
					}
				})
			)
		}
	}, [])
	const onSubmit = async (data: CreateBookValidationSchemaType) => {
		const formData = new FormData()
		formData.append('file', data.picture.blob, data.picture.name)
		const { name: uploadPicture } = await UploadBookPhoto(formData)
		const formDataHtml = new FormData()
		formDataHtml.append(
			'file',
			new Blob(
				[
					data.books
						.map(book => book.content.map(content => content.content).join(''))
						.join('')
				],
				{ type: 'text/html' }
			),
			data.title + '.html'
		)
		const { name: uploadHtml } = await UploadBookHtml(formDataHtml)
		await uploadBookApi({
			title: data.title,
			description: data.description,
			picture: uploadPicture,
			charapters: data.books.flatMap(book =>
				book.content.map(content => {
					return {
						name: content.title,
						link: content.title
					}
				})
			),
			author: {
				id: Number(data.author.value)
			},
			genres: data.genres.map(genre => genre.value),
			file: uploadHtml,
			pages: Number(data.pages),
			popularity: Number(data.popularity)
		})
			.then(() => {
				successToast('Book created')
			})
			.catch(() => {
				errorToast('Error while creating book')
			})
	}
	return (
		<div>
			<h1 className='mb-4 text-center text-3xl font-medium'>Create book</h1>
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
							className='mb-2'
							name={'popularity'}
							placeholder={'Popularity'}
						/>
					</div>
					<h1 className='mb-2'>Description</h1>
					<FormTextEditor
						control={control}
						name={'description'}
						placeholder='Enter description'
						className='h-[145px]'
					/>
				</div>
				<div className='h-max w-1/2'>
					<div className='flex justify-between'>
						<div>
							<h1 className='mt-2  text-xl'>Book file</h1>
							<Dropzone
								size='md'
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
							<ErrorMessage
								name={'books'}
								errors={errors}
								render={({ message }) => (
									<p className={`text-danger text-md mt-2 italic`}>{message}</p>
								)}
							/>
						</div>
						<div>
							<h1 className='mt-2  text-xl'>Cover</h1>
							<FormDropzone
								control={control}
								name={'picture'}
								size='md'
								options={{
									multiple: false,
									accept: {
										image: ['.jpg', '.jpeg', '.png']
									}
								}}
								onDropFile={acceptedFiles => {
									setValue('picture', {
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
								control={control}
								name={'genres'}
								isMulti
								options={genres?.map(genre => ({
									label: genre.name,
									value: genre.id
								}))}
								isSearchable
								placeholder={'Select genres'}
							/>
						</div>
						<div className='w-1/2'>
							<div className='mb-2 mt-4 flex gap-3'>
								<h1 className=''>Author</h1>
								<Button
									onClick={() => {
										showPopup(
											<CreateAuthorPopup
												onCreate={({ id, name }) => {
													closePopup()
													setValue('author', {
														label: name,
														value: id
													})
												}}
											/>
										)
									}}
									size='sm'>
									Create
								</Button>
							</div>
							<FormAsyncSelect
								control={control}
								name={'author'}
								isLoading={authorsLoading}
								loadOptions={authorSearch =>
									authors(authorSearch).then(data =>
										data.map(author => ({
											label: author.name,
											value: author.id
										}))
									)
								}
								isSearchable
								placeholder={'Select author'}
							/>
						</div>
					</div>
				</div>
			</div>

			{books && (
				<div>
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
										<TextArea
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
					<ErrorMessage
						name={'books'}
						errors={errors}
						render={({ message }) => (
							<p className={`text-danger text-md mt-2 italic`}>{message}</p>
						)}
					/>
				</div>
			)}
			<Button
				className='mt-8'
				onClick={() => {
					setValue('books', books)
					handleSubmit(onSubmit)()
					console.log('submit')
				}}
				color='primary'>
				Create
			</Button>
		</div>
	)
}

export default Page
