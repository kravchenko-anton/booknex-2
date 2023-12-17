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
		setBooks(books => {
			return books?.filter(book => book.name !== name)
		})
	}
	
	const addNewCharacter = (bookName: string) => {
		setBooks(books => {
			if (books) {
				return books.map(book => {
					if (book.name === bookName) {
						return {
							...book,
							content: [
								...book.content,
								{
									title: '',
									content: ''
								}
							]
						}
					}
					return book
				})
			}
			return books
		})
	}
	
	const updateCharacterTitle = (value: string, name: string) => {
		setBooks(books => {
			if (books) {
				return books.map(book => {
					if (book.name === name) {
						return {
							...book,
							name: value
						}
					}
					return book
				})
			}
			return books
		})
	}
	
	const removeToc = (name: string, removedContent: string) => {
		setBooks(books => {
			if (books) {
				return books.map(book => {
					if (book.name === name) {
						return {
							...book,
							content: book.content.filter(content => content.content !== removedContent)
						}
					}
					return book
				})
			}
			return books
		})
	}
	
	const updateTocTitle = (oldContent: string, bookName: string, newContent: string) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.name === bookName) {
					return {
						...book,
						content: book.content.map(content => {
							if (content.content === oldContent) {
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
	
	const updateTocContent = (name: string, title: string, newContent: string) => {
		setBooks(books => {
			if (!books) return books
			return books.map(book => {
				if (book.name === name) {
					return {
						...book,
						content: book.content.map(content => {
							if (content.title === title) {
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
	
	const upload = (
		name: string,
		content: {
			title: string
			content: string
		}[]
	) => {
		setBooks(books => {
			if (books) {
				return [
					...books,
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
			removeToc,
			addNewCharacter
		}
	}
}
