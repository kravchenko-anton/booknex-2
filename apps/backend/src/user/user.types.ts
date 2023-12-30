import type { Prisma } from '@prisma/client'

export type UserLibraryCategoryType = keyof Pick<
	Prisma.UserSelect,
	'finishedBooks' | 'readingBooks' | 'savedBooks'
>
export const DesignationType = {
	finishedBooks: 'book',
	readingBooks: 'book'
}
export enum UserLibraryFieldsEnum {
	finishedBooks = 'finishedBooks',
	readingBooks = 'readingBooks',
	savedBooks = 'savedBooks'
}

export const CatalogTitleType = {
	finishedBooks: 'Finished',
	readingBooks: 'Reading',
	savedBooks: 'Saved'
}

export const userLibraryFields: UserLibraryCategoryType[] = [
	UserLibraryFieldsEnum.finishedBooks,
	UserLibraryFieldsEnum.readingBooks
]

export const idSelect = {
	select: { id: true }
}
