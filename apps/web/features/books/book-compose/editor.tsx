import { DropZone, TextArea } from '@/components/ui'
import { parserService } from '@/services/parser/parser-services'
import { blobFormData } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import type { EBookType } from 'backend/src/book/types'
import { CaseSensitive, ChevronDown, ChevronUp, Close } from 'icons'
import { useState, type FC } from 'react'
import type { Control } from 'react-hook-form'

//TODO: сделать тут типизацию

interface BookComposeProperties {
	control: Control<any>
}

const EbookComposer: FC<BookComposeProperties> = () => {
	//TODO: сделать через  filedArray
	const [books, setBooks] = useState<EBookType>([])

	// useLayoutEffect(() => {
	// 	setBooks(defaultBooks || [])
	// }, [defaultBooks])
	const deleteBook = (title: string) => {
		setBooks(books?.filter(book => book.title !== title))
		successToast('Book deleted')
	}
	const { mutateAsync: unfold } = useMutation({
		mutationKey: ['unfold'],
		mutationFn: (formData: FormData) => parserService.unfold(formData),
		onSuccess: () => successToast('File uploaded'),
		onError: () => errorToast('Error while uploading book')
	})

	const generateChaptersNames = (title: string) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.title === title) {
					return {
						...book,
						content: book.chapters.map((content, index) => ({
							...content,
							title: `Chapter ${index + 1}`
						}))
					}
				}
				return book
			})
		})
		successToast('Chapters names generated')
	}
	const addNewCharacterAfterContent = ({
		bookName,
		afterContent
	}: {
		bookName: string
		afterContent: string
	}) => {
		setBooks(books => {
			if (books) {
				return books.map(book => {
					if (book.title === bookName) {
						const index = book.chapters.findIndex(
							content => content.text === afterContent
						)

						return {
							...book,
							content: [
								...book.chapters.slice(0, index + 1),
								{
									id: Math.round(Math.random() * 1_000_000),
									title: '',
									content: ''
								},
								...book.chapters.slice(index + 1)
							]
						}
					}
					return book
				})
			}
			return books
		})
	}

	const mergeContentWithTopCharacter = ({
		bookName,
		topChapterId,
		insertedContent
	}: {
		bookName: string
		topChapterId: number
		insertedContent: string
	}) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.title === bookName) {
					const element = book.chapters.find(
						content => content.id === topChapterId
					)
					const index = book.chapters.findIndex(
						content => content.id === topChapterId
					)
					if (!element) {
						errorToast('Error merging content')
						return book
					}
					return {
						...book,
						chapters: [
							...book.chapters.slice(0, index),
							{
								id: element.id,
								name: element.name,
								text: `${element.text}\n${insertedContent}`
							},
							...book.chapters.slice(index + 1)
						].filter(content => content.text !== insertedContent)
					}
				}
				return book
			})
		})
		successToast('Content merged')
	}

	const updateChapterTitle = (value: string, title: string) => {
		if (!books) return errorToast('Error updating chapter title')
		setBooks(
			books.map(book => {
				if (book.title === title) {
					return {
						...book,
						name: value
					}
				}
				return book
			})
		)
		successToast('Chapter title updated')
	}

	const removeToc = (title: string, removedId: number) => {
		if (!books) return errorToast('Error removing chapter')
		setBooks(
			books.map(book => {
				if (book.title === title) {
					return {
						...book,
						content: book.chapters.filter(content => content.id !== removedId)
					}
				}
				return book
			})
		)
		successToast('Chapter removed')
	}

	const updateTocTitle = (
		oldId: number,
		bookName: string,
		newContent: string
	) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.title === bookName) {
					return {
						...book,
						content: book.chapters.map(content => {
							if (content.id === oldId) {
								return {
									...content,
									title: newContent
								}
							}
							return content
						})
					}
				}
				return book
			})
		})
	}

	const updateTocContent = (name: string, id: number, newContent: string) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.title === name) {
					return {
						...book,
						content: book.chapters.map(content => {
							if (content.id === id) {
								return {
									...content,
									content: newContent
								}
							}
							return content
						})
					}
				}
				return book
			})
		})
	}

	const upload = ({
		title,
		chapters
	}: {
		title: string
		chapters: {
			id: number
			name: string
			text: string
		}[]
	}) => {
		setBooks(books => {
			if (!books)
				return [
					{
						title: title || '',
						chapters: chapters || []
					}
				]
			return [
				...books,
				{
					title: title || '',
					chapters: chapters || []
				}
			]
		})
		successToast('Book uploaded')
	}

	const unfoldWithUpload = (files: File[]) => {
		for (const file of files) {
			unfold(blobFormData(new Blob([file]), file.name)).then(data => {
				upload({
					title: file.name,
					chapters: data
				})
			})
		}
	}

	return (
		<>
			<div>
				<h1 className='mt-2  text-xl'>Book file</h1>
				<DropZone
					multiple
					size='sm'
					accept='.epub'
					onDropFile={unfoldWithUpload}
					onFileDelete={file => deleteBook(file.name)}
				/>
				{/* <ErrorMessage name='books' errors={form.errors} /> */}
			</div>
			{books.map(book => (
				<div
					key={book.title}
					className='bg-foreground mb-4 mr-1 rounded-xl p-3'
				>
					<div className='mb-4 flex items-center  justify-between gap-2'>
						<input
							defaultValue={book.title}
							className='bg-muted hover:border-foreground focus:border-foreground focus:shadow-outline h-full w-full  rounded-xl border-2  border-transparent px-4 py-3 text-sm text-white  placeholder-white duration-200 ease-linear focus:outline-0'
							onBlur={event =>
								updateChapterTitle(event.target.value, book.title)
							}
						/>
						<CaseSensitive
							width={45}
							height={45}
							className='bg-muted cursor-pointer rounded-xl p-2'
							onClick={() => {
								generateChaptersNames(book.title)
								console.log('generate chapters names')
							}}
						/>
					</div>
					{book.chapters.map((content, index) => (
						<div key={content.id} className='bg-muted m-2 rounded-xl p-2'>
							<div className='mb-2 flex w-full items-center justify-between gap-2'>
								<input
									value={content.name}
									className='bg-foreground border-gray w-full rounded-xl border-0 px-4 py-2 text-sm text-white placeholder-white  outline-0 duration-200 ease-linear focus:border-2'
									onChange={event => {
										updateTocTitle(content.id, book.title, event.target.value)
									}}
								/>
								<div className='flex gap-2'>
									<ChevronUp
										width={36}
										height={36}
										className='bg-muted cursor-pointer rounded-xl p-2'
										onClick={() => {
											mergeContentWithTopCharacter({
												bookName: book.title,
												insertedContent: content.text,
												topChapterId: book.chapters[index - 1].id
											})
											console.log('merge with top character')
										}}
									/>
									<ChevronDown
										width={36}
										height={36}
										className='bg-muted cursor-pointer rounded-xl p-2'
										onClick={() => {
											addNewCharacterAfterContent({
												bookName: book.title,
												afterContent: content.text
											})
											console.log('add new character')
										}}
									/>
									<Close
										width={36}
										height={36}
										className='bg-muted cursor-pointer rounded-xl p-2'
										onClick={() => {
											removeToc(book.title, content.id)
											console.log('remove toc')
										}}
									/>
								</div>
							</div>

							<TextArea
								value={content.text}
								variant='background'
								className='min-h-[340px] w-full rounded-xl border-0 px-4 py-2 font-mono text-sm duration-200 ease-linear'
								onChange={event => {
									updateTocContent(book.title, content.id, event.target.value)
								}}
							/>
						</div>
					))}
				</div>
			))}
		</>
	)
}

export default EbookComposer
