import { chapterNames } from '@/app/admin/book/_components/ebook-editor/chapter-names'
import api from '@/services/api'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { MutationKeys } from 'global/utils/query-keys'
import type { EBookPayloadType } from 'global/validation/book/ebook.payload.dto'

export const useBookCompose = ({
	ebooks: ebooks,
	setEBooks: setEBooks
}: {
	ebooks: EBookPayloadType[] | undefined
	setEBooks: (books: EBookPayloadType[]) => void
}) => {
	const { mutateAsync: unfold, isLoading: unfoldLoading } = useMutation({
		mutationKey: MutationKeys.bookTemplate.unfold,
		mutationFn: (file: File) => api.parser.unfold(file),
		onSuccess: () => successToast('File uploaded'),
		onError: () => errorToast('Error while uploading book')
	})

	const deleteBook = ({ bookId }: { bookId: number }) => {
		if (!ebooks) return errorToast('Error deleting book')
		setEBooks(ebooks?.filter(book => book.id !== bookId))
		successToast('Book deleted')
	}

	const stashEBook = () => {
		if (!ebooks) return errorToast('Error stashing book')
		localStorage.setItem('ebooks', JSON.stringify(ebooks))
		successToast('Book stashed')
	}

	const unStashEBook = () => {
		const ebooks = JSON.parse(localStorage.getItem('ebooks') || '[]')
		setEBooks(ebooks)
		successToast('Book unstashed')
	}

	const trimmingEBookContent = ({
		bookId,
		startLine,
		endLine
	}: {
		bookId: number
		startLine: number
		endLine: number
	}) => {
		if (!ebooks) return errorToast('Error trimming book')
		setEBooks(
			ebooks.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						chapters: book.chapters.map(({ id, name, text }) => ({
							id,
							name,
							text: text
								.split('\n')
								.filter(
									(_, index) => index < startLine - 1 || index > endLine - 1
								)
								.join('\n')
						}))
					}
				}
				return book
			})
		)
		successToast('Book trimmed')
	}

	const generateChapterNames = ({ bookId }: { bookId: number }) => {
		if (!ebooks) return errorToast('Error generating chapter names')

		setEBooks(
			ebooks.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						chapters: book.chapters.map((content, index) => ({
							...content,

							name: `Chapter ${chapterNames[index]}`
						}))
					}
				}
				return book
			})
		)
	}
	const addNewCharacterAfterContent = ({
		bookId,
		chapterId
	}: {
		bookId: number
		chapterId: number
	}) => {
		if (!ebooks) return errorToast('Error adding new chapter')
		setEBooks(
			ebooks.map(book => {
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
		)
	}
	const moveChaptersToNewBook = ({
		bookId,
		chapterId
	}: {
		bookId: number
		chapterId: number
	}) => {
		if (!ebooks) return errorToast('Error moving chapters')
		const book = ebooks.find(book => book.id === bookId)
		if (!book) return ebooks
		const index = book.chapters.findIndex(content => content.id === chapterId)
		if (index <= 1) return errorToast('Error moving chapters')
		const chapters = book.chapters.slice(index)
		const oldBookChapters = book.chapters.filter(
			content => !chapters.some(chapter => chapter.id === content.id)
		)
		const newBook = {
			id: ebooks.length + 1,
			title: `${ebooks.length + 1} book`,
			chapters
		}
		return setEBooks([
			...ebooks.map(book =>
				book.id === bookId ? { ...book, chapters: oldBookChapters } : book
			),
			newBook
		])
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
		if (!ebooks) return errorToast('Error merging content')
		return setEBooks(
			ebooks.map(book => {
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
		)
	}

	const updateBookTitle = ({
		value,
		bookId
	}: {
		value: string
		bookId: number
	}) => {
		if (!ebooks) return errorToast('Error updating book title')
		setEBooks(
			ebooks.map(book => {
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
		if (!ebooks) return errorToast('Error removing chapter')
		setEBooks(
			ebooks.map(book => {
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
		if (!ebooks) return errorToast('Error updating chapter')
		setEBooks(
			ebooks.map(book => {
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
		)
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
		const elementIndex = ebooks?.length || 0

		setEBooks([
			...(ebooks || []),
			{
				id: elementIndex + 1,
				title: title || '',
				chapters: chapters || []
			}
		])
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
			stashEBook,
			unStashEBook,
			upload: unfoldWithUpload,
			state: ebooks || [],
			unfoldLoading,
			trimmingEBookContent,
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
