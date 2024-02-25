import type { EbookValidationType } from '@/features/books/ebook-validation'
import api from '@/services'
import { blobFormData } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import type { EBookType } from 'backend/src/book/types'
import { useLayoutEffect, useState } from 'react'

export const useBookCompose = (defaultBooks?: EBookType) => {
	const [books, setBooks] = useState<EbookValidationType | null>([])
	useLayoutEffect(() => {
		setBooks(defaultBooks || [])
	}, [defaultBooks])

	const { mutateAsync: unfold } = useMutation({
		mutationKey: ['unfold'],
		mutationFn: (formData: FormData) => api.parser.unfold(formData as any),
		onSuccess: () => successToast('File uploaded'),
		onError: () => errorToast('Error while uploading book')
	})

	const deleteBook = ({ bookId }: { bookId: number }) => {
		if (!books) return errorToast('Error deleting book')
		setBooks(books?.filter(book => book.id !== bookId))
		successToast('Book deleted')
	}
	const generateChaptersNames = ({ bookId }: { bookId: number }) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						chapters: book.chapters.map((content, index) => ({
							...content,
							name: `Chapter ${index + 1}`
						}))
					}
				}
				return book
			})
		})
	}
	const addNewCharacterAfterContent = ({
		bookId,
		chapterId
	}: {
		bookId: number
		chapterId: number
	}) => {
		setBooks(books => {
			if (books) {
				return books.map(book => {
					if (book.id === bookId) {
						const index = book.chapters.findIndex(
							content => content.id === chapterId
						)

						return {
							...book,
							chapters: [
								...book.chapters.slice(0, index + 1),
								{
									id: Math.round(Math.random() * 1_000_000),
									name: '',
									text: ''
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
		bookId,
		topChapterId,
		insertedContent
	}: {
		bookId: number
		topChapterId: number
		insertedContent: string
	}) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.id === bookId) {
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
	}

	const updateChapterTitle = ({
		value,
		bookId
	}: {
		value: string
		bookId: number
	}) => {
		if (!books) return errorToast('Error updating chapter title')
		setBooks(
			books.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						title: value
					}
				}
				return book
			})
		)
	}

	const removeToc = (title: string, removedId: number) => {
		if (!books) return errorToast('Error removing chapter')
		setBooks(
			books.map(book => {
				if (book.title === title) {
					return {
						...book,
						chapters: book.chapters.filter(content => content.id !== removedId)
					}
				}
				return book
			})
		)
		successToast('Chapter removed')
	}

	const updateTocTitle = ({
		chapterId,
		bookId,
		value
	}: {
		chapterId: number
		bookId: number
		value: string
	}) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						chapters: book.chapters.map(chapter => {
							if (chapter.id === chapterId) {
								return {
									...chapter,
									name: value
								}
							}
							return chapter
						})
					}
				}
				return book
			})
		})
	}

	const updateTocContent = ({
		bookId,
		chapterId,
		value
	}: {
		bookId: number
		chapterId: number
		value: string
	}) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						chapters: book.chapters.map(chapter => {
							if (chapter.id === chapterId) {
								return {
									...chapter,
									text: value
								}
							}
							return chapter
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
		const elementIndex = books?.length || 0
		setBooks(previousState => {
			if (!previousState)
				return [
					{
						id: elementIndex + 1,
						title: title || '',
						chapters: chapters || []
					}
				]
			return [
				...previousState,
				{
					id: elementIndex + 1,
					title: title || '',
					chapters: chapters || []
				}
			]
		})
		successToast('Book uploaded')
	}

	const unfoldWithUpload = (files: File[]) => {
		for (const file of files) {
			unfold(blobFormData(new Blob([file]), file.name)).then(
				({ data: chapters }) => {
					upload({
						title: file.name,
						chapters
					})
				}
			)
		}
	}

	return {
		books: {
			upload: unfoldWithUpload,
			state: books || [],
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
