import { parserService } from '@/services/parser/parser-services'
import { blobFormData } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import type { EBookType } from 'backend/src/book/types'
import { useLayoutEffect, useState } from 'react'

export interface BookComposeReturnType {
	upload: (files: File[]) => void
	state: EBookType | undefined
	delete: (title: string) => void
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
	defaultBooks?: EBookType
): {
	books: BookComposeReturnType
} => {
	const [books, setBooks] = useState<EBookType>()

	useLayoutEffect(() => {
		setBooks(defaultBooks || [])
	}, [defaultBooks])

	const { mutateAsync: unfold } = useMutation({
		mutationKey: ['unfold'],
		mutationFn: (formData: FormData) => parserService.unfold(formData),
		onSuccess: () => successToast('File uploaded'),
		onError: () => errorToast('Error while uploading book')
	})

	const deleteBook = (title: string) => {
		setBooks(books?.filter(book => book.title !== title))
		successToast('Book deleted')
	}
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
