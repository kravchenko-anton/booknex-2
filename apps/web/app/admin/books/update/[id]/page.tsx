'use client'
import CreateAuthorPopup from '@/app/admin/authors/popup/create'
import type { UpdateBookValidationSchemaType } from '@/app/admin/books/update/[id]/validation'
import { updateBookValidationSchema } from '@/app/admin/books/update/[id]/validation'
import HtmlEditor from '@/components/html-editor/html-editor'
import { getFileUrl } from '@/global/api-config'
import type { BookPayload } from '@/global/services-types/book-types'
import { useAction } from '@/hooks'
import { Trash } from '@/icons'
import { authorService } from '@/services/author/author-service'
import { bookService } from '@/services/book/book-service'
import { genreService } from '@/services/genre/genre-service'
import {
	Button,
	Field,
	FormAsyncSelect,
	FormDropZone,
	FormSelect,
	FormTextArea,
	Input
} from '@/ui/components'
import { useUploadFile } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { Editor } from '@tinymce/tinymce-react'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StorageFolderEnum } from '../../../../../../backend/src/storage/storage.types'

const Page: FC<{
	params: {
		id: number
	}
}> = ({ params }) => {
	const { data: book } = useQuery(['book'], () =>
		bookService.infoById(params.id)
	)
	const { showPopup, closePopup } = useAction()
	const { data: genres } = useQuery(['genres'], () => genreService.all())
	const { mutateAsync: authors, isLoading: authorsLoading } = useMutation(
		['authors'],
		(authorSearch: string) => authorService.allSelect(authorSearch)
	)
	const { upload } = useUploadFile()
	const { mutateAsync: update } = useMutation(
		['update book'],
		(payload: BookPayload) => bookService.create(payload),
		{
			onSuccess: () => {
				successToast('Book updated')
			},
			onError: () => errorToast('Error while uploading book')
		}
	)
	const htmlEditor = useRef<Editor>(null)
	const [charapters, setCharapters] = useState<
		{
			name: string
			children: {
				name: string
				link: string
			}[]
		}[]
	>()
	console.log(charapters)
	const [html, setHtml] = useState('')
	console.log(book)
	const { control, handleSubmit, setValue } =
		useForm<UpdateBookValidationSchemaType>({
			resolver: zodResolver(updateBookValidationSchema)
		})

	const onSubmit = handleSubmit(async data => {
		const picture = data.picture
			? await upload({
					name: data.picture.name,
					blob: data.picture.blob,
					folder: StorageFolderEnum.booksCovers
				})
			: null
		const { name: uploadHtml } = await upload({
			name: data.title + '.html',
			blob: new Blob([html], { type: 'text/html' }),
			folder: StorageFolderEnum.ebooks
		})
		await update({
			title: data.title,
			description: data.description,
			charapters: charapters,
			author: {
				id: Number(data.author.value)
			},
			genres: data.genres.map(genre => genre.value),
			file: uploadHtml,
			pages: Number(data.pages),
			popularity: Number(data.popularity),
			...(picture && { picture: picture })
		})
			.then(() => {
				successToast('Book created')
			})
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
			setCharapters(book.charapters)
			const asyncFunction = async () =>
				fetch(getFileUrl(book.file)).then(response => {
					return response.text()
				})
			asyncFunction().then(parsedText => {
				setHtml(parsedText)
				htmlEditor?.current?.editor?.setContent(parsedText)
			})
			setValue('title', book.title)
			setValue('pages', book.pages.toString())
			setValue('popularity', book.popularity.toString())
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
			setValue('author', {
				label: book.author.name,
				value: book.author.id
			})
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
							<FormDropZone
								control={control}
								name='picture'
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
								<Button
									onClick={() =>
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
									}
									size='sm'
								>
									Create
								</Button>
							</div>
							<FormAsyncSelect
								control={control}
								name='author'
								isLoading={authorsLoading}
								loadOptions={authorSearch =>
									authors(authorSearch).then(data =>
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
			<div className='mt-4 flex w-full gap-5'>
				<div className='bg-shade flex h-[1000px] w-1/3 flex-wrap justify-between gap-10  overflow-scroll rounded-md p-4'>
					{charapters &&
						charapters.length !== 0 &&
						charapters.map(charapter => {
							if (!charapter.name) return null
							return (
								<div>
									<Input
										className='mb-2'
										value={charapter.name}
										onChange={e => {
											setCharapters(
												charapters.map(charapterMap => {
													if (charapterMap.name === charapter.name) {
														charapterMap.name = e.target.value
													}
													return charapterMap
												})
											)
										}}
									/>
									{charapter.children?.map(child => {
										return (
											<button
												key={child.id}
												onDoubleClick={() => {
													navigateInEditor(child.link)
												}}
												className='mb-2  w-1/2 px-1'
											>
												<div className='bg-foreground rounded-md  p-2'>
													<div className='mb-2 flex items-center justify-between gap-1'>
														<Input
															variant='vibrant'
															value={child.name}
															onChange={e => {
																// update child title only
																setCharapters(
																	charapters.map(charapterMap => {
																		if (charapterMap.name === charapter.name) {
																			charapterMap.children =
																				charapterMap.children?.map(childMap => {
																					if (childMap.link === child.link) {
																						childMap.name = e.target.value
																					}
																					return childMap
																				})
																		}
																		return charapterMap
																	})
																)
															}}
														/>
														<Trash
															width={50}
															height={45}
															onClick={() => {
																setCharapters(
																	charapters.map(charapterMap => {
																		if (charapterMap.name === charapter.name) {
																			charapterMap.children =
																				charapterMap.children?.filter(
																					childMap =>
																						childMap.link !== child.link
																				)
																		}
																		return charapterMap
																	})
																)
															}}
															className='bg-shade rounded-md p-1'
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

				<HtmlEditor
					reference={htmlEditor}
					className='z-0 w-full'
					onChange={content => {
						setHtml(content.target.getContent())
					}}
				/>
			</div>

			<Button className='mt-8' onClick={onSubmit} variant='primary'>
				Create
			</Button>
		</div>
	)
}

export default Page
