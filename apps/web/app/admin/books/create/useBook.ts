import { useState } from 'react'

export const useBookCompose = () => {
	const [books, setBooks] = useState<
		{
			name: string
			content: {
				title: string
				content: string
			}[]
		}[]
	>([])

	const deleteBook = (name: string) => {
		setBooks(previous => {
			return previous?.filter(book => book.name !== name)
		})
	}

	const updateCharacterTitle = (value: string, name: string) => {
		setBooks(previous => {
			if (previous) {
				return previous.map(previousBook => {
					if (previousBook.name === name) {
						return {
							...previousBook,
							name: value
						}
					}
					return previousBook
				})
			}
			return previous
		})
	}

	const removeToc = (name: string, title: string) => {
		setBooks(previousState => {
			if (previousState) {
				return books.map(book => {
					if (book.name === name) {
						return {
							...book,
							content: book.content.filter(content => content.title !== title)
						}
					}
					return book
				})
			}
			return previousState
		})
	}

	const updateTocTitle = (title: string, name: string, NewValue: string) => {
		setBooks(previous => {
			if (previous) {
				return previous.map(previousBook => {
					if (previousBook.name === name) {
						return {
							...previousBook,
							content: previousBook.content.map(previousContent => {
								if (previousContent.title === title) {
									return {
										...previousContent,
										title: NewValue
									}
								}
								return previousContent
							})
						}
					}
					return previousBook
				})
			}
			return previous
		})
	}

	const updateTocContent = (name: string, title: string, newValue: string) => {
		setBooks(previous => {
			if (previous) {
				return previous.map(previousBook => {
					if (previousBook.name === name) {
						return {
							...previousBook,
							content: previousBook.content.map(previousContent => {
								if (previousContent.title === title) {
									return {
										...previousContent,
										content: newValue
									}
								}
								return previousContent
							})
						}
					}
					return previousBook
				})
			}
			return previous
		})
	}

	const upload = (
		name: string,
		content: {
			title: string
			content: string
		}[]
	) => {
		setBooks(previous => {
			if (previous) {
				return [
					...previous,
					{
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
	}

	return {
		books,
		booksFunctions: {
			delete: deleteBook,
			upload,
			updateTocContent,
			updateTocTitle,
			updateCharacterTitle,
			removeToc
		}
	}
}
