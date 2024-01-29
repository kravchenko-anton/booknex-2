export enum StorageFolderEnum {
	ebooks = 'ebooks',
	booksCovers = 'books-covers'
}

export type StorageFolderType = keyof typeof StorageFolderEnum
export const StorageFolderArray: string[] = [
	StorageFolderEnum.ebooks,
	StorageFolderEnum.booksCovers
]
