export enum StorageFolderEnum {
	ebooks = 'ebooks',
	booksCovers = 'booksCovers'
}

export type StorageFolderType = keyof typeof StorageFolderEnum
export const StorageFolderArray: string[] = [
	StorageFolderEnum.ebooks,
	StorageFolderEnum.booksCovers
]
