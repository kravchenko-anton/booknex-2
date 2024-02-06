import { parserService } from '@/services/parser/parser-services'
import { blobFormData } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'

export interface EbookType {
	name: string
	content: {
		id: number
		title: string
		content: string
	}[]
}

export interface BookComposeReturnType {
	upload: (files: File[]) => void
	state: EbookType[] | undefined
	delete: (book: { name: string }) => void
	generateChaptersNames: (bookName: string) => void
	addNewCharacterAfterContent: (data: {
		bookName: string
		afterContent: string
	}) => void
	mergeContentWithTopCharacter: (data: {
		bookName: string
		topChapterId: number
		insertedContent: string
	}) => void
	updateTocContent: (name: string, id: number, newContent: string) => void
	updateTocTitle: (oldId: number, bookName: string, newContent: string) => void
	updateChapterTitle: (value: string, name: string) => void
	removeToc: (name: string, removedId: number) => void
}

export const useBookCompose = (
	defaultBooks?: EbookType[]
): {
	books: BookComposeReturnType
} => {
	const [books, setBooks] = useState<EbookType[]>()

	useLayoutEffect(() => {
		setBooks(defaultBooks || [])
	}, [defaultBooks])

	const { mutateAsync: unfold } = useMutation({
		mutationKey: ['unfold'],
		mutationFn: (formData: FormData) => parserService.unfold(formData),
		onSuccess: () => successToast('File uploaded'),
		onError: () => errorToast('Error while uploading book')
	})

	const deleteBook = ({ name }: { name: string }) => {
		setBooks(books?.filter(book => book.name !== name))
		successToast('Book deleted')
	}
	const generateChaptersNames = (bookName: string) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.name === bookName) {
					return {
						...book,
						content: book.content.map((content, index) => ({
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
					if (book.name === bookName) {
						const index = book.content.findIndex(
							content => content.content === afterContent
						)

						return {
							...book,
							content: [
								...book.content.slice(0, index + 1),
								{
									id: Math.round(Math.random() * 1_000_000),
									title: '',
									content: ''
								},
								...book.content.slice(index + 1)
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
				if (book.name === bookName) {
					const element = book.content.find(
						content => content.id === topChapterId
					)
					const index = book.content.findIndex(
						content => content.id === topChapterId
					)
					if (!element) {
						errorToast('Error merging content')
						return book
					}
					return {
						...book,
						content: [
							...book.content.slice(0, index),
							{
								id: element.id,
								title: element.title,
								content: `${element.content}\n${insertedContent}`
							},
							...book.content.slice(index + 1)
						].filter(content => content.content !== insertedContent)
					}
				}
				return book
			})
		})
		successToast('Content merged')
	}

	const updateChapterTitle = (value: string, name: string) => {
		if (!books) return errorToast('Error updating chapter title')
		setBooks(
			books.map(book => {
				if (book.name === name) {
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

	const removeToc = (name: string, removedId: number) => {
		if (!books) return errorToast('Error removing chapter')
		setBooks(
			books.map(book => {
				if (book.name === name) {
					return {
						...book,
						content: book.content.filter(content => content.id !== removedId)
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
				if (book.name === bookName) {
					return {
						...book,
						content: book.content.map(content => {
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
				if (book.name === name) {
					return {
						...book,
						content: book.content.map(content => {
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
		name,
		content
	}: {
		name: string
		content: {
			id: number
			title: string
			content: string
		}[]
	}) => {
		setBooks(books => {
			if (!books)
				return [
					{
						name: name || '',
						content: content || []
					}
				]
			return [
				...books,
				{
					name: name || '',
					content: content || []
				}
			]
		})
		successToast('Book uploaded')
	}

	const unfoldWithUpload = (files: File[]) => {
		for (const file of files) {
			unfold(blobFormData(new Blob([file]), file.name)).then(data => {
				upload({
					name: file.name,
					content: data
				})
			})
		}
	}

	return {
		books: {
			upload: unfoldWithUpload,
			state: books,
			generateChaptersNames,
			addNewCharacterAfterContent,
			delete: deleteBook,
			updateTocContent,
			updateTocTitle,
			updateChapterTitle,
			mergeContentWithTopCharacter,
			removeToc
		}
	}
}
