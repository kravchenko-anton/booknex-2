import api from '@/services'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import type { PayloadEBook } from 'global/api-client'
import { useLayoutEffect, useState } from 'react'

export const useBookCompose = (defaultBooks?: PayloadEBook[]) => {
	const [books, setBooks] = useState<PayloadEBook[] | null>([])
	useLayoutEffect(() => setBooks(defaultBooks || []), [defaultBooks])

	const { mutateAsync: unfold, isLoading: unfoldLoading } = useMutation({
		mutationKey: ['unfold'],
		mutationFn: (file: File) => api.parser.unfold(file),
		onSuccess: () => successToast('File uploaded'),
		onError: () => errorToast('Error while uploading book')
	})

	const deleteBook = ({ bookId }: { bookId: number }) => {
		if (!books) return errorToast('Error deleting book')
		setBooks(books?.filter(book => book.id !== bookId))
		successToast('Book deleted')
	}
	const generateChapterNames = ({ bookId }: { bookId: number }) => {
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
	const moveChaptersToNewBook = ({
		bookId,
		chapterId
	}: {
		bookId: number
		chapterId: number
	}) => {
		if (!books) return errorToast('Error moving chapters')
		const book = books.find(book => book.id === bookId)
		if (!book) return books
		const index = book.chapters.findIndex(content => content.id === chapterId)
		if (index <= 1) return errorToast('Error moving chapters')
		const chapters = book.chapters.slice(index)
		const oldBookChapters = book.chapters.filter(
			content => !chapters.some(chapter => chapter.id === content.id)
		)
		const newBook = {
			id: books.length + 1,
			title: `${books.length + 1} book`,
			chapters
		}
		return setBooks(books => {
			if (!books) return books
			return [
				...books.map(book =>
					book.id === bookId ? { ...book, chapters: oldBookChapters } : book
				),
				newBook
			]
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
	}) =>
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

	const updateBookTitle = ({
		value,
		bookId
	}: {
		value: string
		bookId: number
	}) => {
		if (!books) return errorToast('Error updating book title')
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

	const removeChapter = (bookId: number, removedId: number) => {
		if (!books) return errorToast('Error removing chapter')
		setBooks(
			books.map(book => {
				if (book.id === bookId) {
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

	const updateChapter = ({
		chapterId,
		bookId,
		value
	}: {
		chapterId: number
		bookId: number
		value: {
			name?: string
			text?: string
		}
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
									...value
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
			unfold(new File([file], file.name)).then(({ data: chapters }) => {
				upload({
					title: file.name,
					chapters
				})
			})
		}
	}

	return {
		books: {
			upload: unfoldWithUpload,
			state: books || [],
			unfoldLoading,
			generateChapterNames,
			addNewCharacterAfterContent,
			delete: deleteBook,
			updateToc: updateChapter,
			updateBookTitle,
			mergeContentWithTopCharacter,
			removeToc: removeChapter,
			moveChaptersToNewBook
		}
	}
}
