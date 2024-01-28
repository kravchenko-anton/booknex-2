'use client'
import { useChapters } from '@/features/books/update/useCharapters'
import type { UpdateBookValidationSchemaType } from '@/features/books/update/validation'
import { updateBookValidationSchema } from '@/features/books/update/validation'
import { bookService } from '@/shared/services/book/book-service'
import { genreService } from '@/shared/services/genre/genre-service'
import { ErrorMessage, FormSelect, FormTextArea } from '@/shared/ui'
import Dropzone from '@/shared/ui/dropzone/dropzone'
import { SheetTrigger } from '@/shared/ui/sheet'
import { useUploadFile } from '@/shared/utils/files'
import { errorToast, successToast } from '@/shared/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { StorageFolderEnum } from 'backend/src/storage/storage.types'
import { getFileUrl } from 'global/api-config'
import type { BookPayload } from 'global/services-types/book-types'
import { Trash } from 'icons'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../../../shared/ui/button/button'
import Field from '../../../../../shared/ui/field/field'
import Input from '../../../../../shared/ui/field/input'
//TODO: полностью переделать по нормальному

const Page = () => {
	const parameters = useParams()
	const { data: book } = useQuery(['book'], () =>
		bookService.infoById(+parameters.id)
	)
	const router = useRouter()
	const { data: genres } = useQuery(['genres'], () => genreService.all())

	const { upload } = useUploadFile()
	const { mutateAsync: update } = useMutation(
		['update book'],
		(payload: Partial<BookPayload>) =>
			bookService.update(+parameters.id, payload),
		{
			onSuccess: () => {
				successToast('Book updated')
				router.push('/admin/books')
			},
			onError: () => errorToast('Error while uploading book')
		}
	)
	const htmlEditor = useRef(null)
	const [isHtmlChanged, setIsHtmlChanged] = useState(false)
	const [html, setHtml] = useState('')
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<UpdateBookValidationSchemaType>({
		resolver: zodResolver(updateBookValidationSchema)
	})
	const { chapters } = useChapters()
	const onSubmit = handleSubmit(async data => {
		//TODO: сделать реплейс
		const picture = data.picture
			? await upload({
					name: data.picture.name,
					blob: data.picture.blob,
					folder: StorageFolderEnum.booksCovers
				})
			: null

		const uploadHtml = isHtmlChanged
			? await upload({
					name: data.title + '.html',
					blob: new Blob([html], { type: 'text/html' }),
					folder: StorageFolderEnum.ebooks
				})
			: null
		await update({
			...(data.title && { title: data.title }),
			...(data.description && { description: data.description }),
			...(chapters.state && { chapters: chapters.state }),
			...(data.genres && { genres: data.genres.map(genre => genre.value) }),
			...(uploadHtml && { file: uploadHtml.name }),
			...(data.pages && { pages: data.pages }),
			...(data.popularity && { popularity: data.popularity }),
			...(picture && { picture: picture.name })
		})
			.then(() => {})
			.catch(() => {
				errorToast('Error while creating book')
			})
	})

	const navigateInEditor = (id: string) => {
		const body = htmlEditor?.current?.editor?.getBody()
		const element = body?.querySelector(`[id="${id}"]`)
		if (element) element.scrollIntoView()
	}

	useEffect(() => {
		if (book) {
			chapters.setChapters(book.chapters as never)
			const asyncFunction = async () =>
				fetch(getFileUrl(book.file)).then(response => {
					return response.text()
				})
			asyncFunction().then(parsedText => {
				setHtml(parsedText)
				htmlEditor.current?.editor?.setContent(parsedText)
			})
			setValue('title', book.title)
			setValue('pages', book.pages)
			setValue('popularity', book.popularity)
			setValue('description', book.description)
			setValue(
				'genres',
				book.genres.map(genre => {
					return {
						label: genre.name,
						value: genre.id
					}
				})
			)
		}
	}, [book])

	if (!book || !genres) return null
	return (
		<div>
			<h1 className='mb-4 text-center text-3xl font-medium'>Update book</h1>
			<div className=' flex justify-between gap-5'>
				<div className='w-1/2'>
					<div className='mt-2 flex justify-between gap-3'>
						<Field
							control={control}
							className='w-1/2'
							name='title'
							placeholder='Title'
						/>

						<Field
							type='number'
							control={control}
							name='pages'
							placeholder='Pages'
						/>
						<Field
							type='number'
							control={control}
							name='popularity'
							placeholder='Popularity'
						/>
					</div>
					<h1 className='mb-2 mt-4'>Description</h1>
					<FormTextArea
						control={control}
						name='description'
						placeholder='Enter description'
						className='h-[250px]'
					/>
				</div>

				<div className='h-max w-1/2'>
					<div className='flex justify-between gap-6'>
						<div>
							<h1 className='mt-2  text-xl'>Cover</h1>
							<Dropzone
								size='md'
								multiple={false}
								accept='image/*'
								onDropFile={acceptedFiles => {
									setValue('picture', {
										name: acceptedFiles[0].name,
										blob: new Blob([acceptedFiles[0]])
									})
								}}
							/>

							<ErrorMessage name='picture' errors={errors} />
						</div>
					</div>
					<div className='flex justify-between gap-6'>
						<div className='w-1/2'>
							<h1 className='mb-2 mt-4 flex gap-5'>
								Genres <p className='text-gray'>First genre be main</p>
							</h1>
							<FormSelect
								control={control}
								name='genres'
								isMulti
								options={genres.map(genre => {
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
							<Field
								type='text'
								control={control}
								name='author'
								placeholder='Author'
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-4 flex w-full gap-5'>
				<div className='bg-muted flex h-[1000px] w-1/3 flex-wrap justify-between gap-10  overflow-scroll rounded-xl p-4'>
					{chapters?.state?.map(({ children, name }) => {
						if (!name) return null
						return (
							<div key={name}>
								<Input
									className='mb-2'
									value={name}
									onChange={event => {
										chapters.updateBookName({
											name,
											value: event.target.value
										})
									}}
								/>
								{children.map(child => {
									return (
										<button
											key={child.link}
											onDoubleClick={() => {
												navigateInEditor(child.link)
											}}
											className='mb-2  w-1/2 px-1'
										>
											<div className='bg-foreground rounded-xl  p-2'>
												<div className='mb-2 flex items-center justify-between gap-1'>
													<Input
														variant='muted'
														value={child.name}
														onChange={event => {
															chapters.updateChapterName({
																name,
																link: child.link,
																value: event.target.value
															})
														}}
													/>
													<Trash
														width={50}
														height={45}
														onClick={() => {
															chapters.removeChapter({
																name,
																link: child.link
															})
														}}
														className='bg-muted rounded-xl p-1'
													/>
												</div>
												<h6 className='text-gray text-sm italic'>
													{child.link}
												</h6>
											</div>
										</button>
									)
								})}
							</div>
						)
					})}
				</div>

				{
					// TODO:  Сделать так-же как при создании и только в preview делать композицию книги
				}
			</div>

			<Button size='md' className='mt-8' onClick={onSubmit} variant='primary'>
				Update
			</Button>
		</div>
	)
}
export default Page
