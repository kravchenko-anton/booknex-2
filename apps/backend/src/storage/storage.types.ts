export enum StorageFolderEnum {
	ebooks = 'ebooks',
	booksCovers = 'books-covers',
	userPictures = 'user-pictures',
	authorPictures = 'author-pictures'
}

export type StorageFolderType = keyof typeof StorageFolderEnum
export const StorageFolderArray: string[] = [
	StorageFolderEnum.ebooks,
	StorageFolderEnum.authorPictures,
	StorageFolderEnum.booksCovers,
	StorageFolderEnum.userPictures
]
export const UserStorageFolderArray: string[] = [StorageFolderEnum.userPictures]
