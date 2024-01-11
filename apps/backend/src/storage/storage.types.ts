export enum StorageFolderEnum {
	ebooks = 'ebooks',
	booksCovers = 'books-covers',
	authorPictures = 'author-pictures'
}

export type StorageFolderType = keyof typeof StorageFolderEnum
export const StorageFolderArray: string[] = [
	StorageFolderEnum.ebooks,
	StorageFolderEnum.authorPictures,
	StorageFolderEnum.booksCovers
]
