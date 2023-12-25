import { useState } from 'react'
import toast from 'react-hot-toast'

export const useBookCompose = () => {
	const [books, setBooks] = useState<
		{
			name: string
			content: {
				id: string
				title: string
				content: string
			}[]
		}[]
	>([])

	const chapters = books.map(book => {
		return {
			name: book.name,
			children: book.content.map(content => {
				return {
					id: content.id,
					name: content.title,
					link: book.name + '/' + content.title
				}
			})
		}
	})
	const deleteBook = ({ name }: { name: string }) => {
		setBooks(books?.filter(book => book.name !== name))
		toast('Book deleted')
	}
	const generateChaptersNames = (bookName: string) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.name === bookName) {
					return {
						...book,
						content: book.content.map((content, index) => {
							return {
								...content,
								title: `Chapter ${index + 1}`
							}
						})
					}
				}
				return book
			})
		})
		toast('Chapters names generated')
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
									id: Date.now().toString(),
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
		topChapterId: string
		insertedContent: string
	}) => {
		setBooks(books => {
			return books.map(book => {
				if (book.name === bookName) {
					const element = book.content.find(
						content => content.id === topChapterId
					)
					const index = book.content.findIndex(
						content => content.id === topChapterId
					)
					if (!element) {
						toast.error('Error merging content')
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
		toast('Content merged')
	}

	const updateChapterTitle = (value: string, name: string) => {
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
		toast('Chapter title updated')
	}

	const removeToc = (name: string, removedId: string) => {
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
		toast('Chapter removed')
	}

	const updateTocTitle = (
		oldId: string,
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

	const updateTocContent = (name: string, id: string, newContent: string) => {
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
			id: string
			title: string
			content: string
		}[]
	}) => {
		setBooks(books => {
			if (books) {
				return [
					...books,
					{
						id: Date.now().toString(),
						name: name || '',
						content: content || []
					}
				]
			}
			return [
				{
					name: name || '',
					content: content || []
				}
			]
		})
		toast('Book uploaded')
	}

	return {
		chapters,
		books: {
			state: books,
			generateChaptersNames,
			addNewCharacterAfterContent,
			delete: deleteBook,
			upload,
			updateTocContent,
			updateTocTitle,
			updateChapterTitle,
			mergeContentWithTopCharacter,
			removeToc
		}
	}
}
