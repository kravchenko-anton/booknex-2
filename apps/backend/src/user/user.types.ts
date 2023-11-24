import type { Prisma } from '@prisma/client'

export type UserLibraryCategoryType = keyof Pick<
	Prisma.UserSelect,
	'finishedBooks' | 'readingBooks' | 'watchedShelves' | 'hiddenShelves'
>
export const DesignationType = {
	finishedBooks: 'book',
	readingBooks: 'book',
	watchedShelves: 'shelf',
	hiddenShelves: 'shelf'
}
export enum UserLibraryFieldsEnum {
	finishedBooks = 'finishedBooks',
	readingBooks = 'readingBooks',
	watchedShelves = 'watchedShelves',
	hiddenShelves = 'hiddenShelves'
}

export const UserOppositeToggle = {
	finishedBooks: UserLibraryFieldsEnum.readingBooks,
	readingBooks: UserLibraryFieldsEnum.finishedBooks,
	watchedShelves: UserLibraryFieldsEnum.hiddenShelves,
	hiddenShelves: UserLibraryFieldsEnum.watchedShelves
}

export const CatalogTitleType = {
	finishedBooks: 'Finished',
	readingBooks: 'Reading',
	watchedShelves: 'Watched',
	hiddenShelves: 'Hidden'
}

export const userLibraryFields: UserLibraryCategoryType[] = [
	UserLibraryFieldsEnum.finishedBooks,
	UserLibraryFieldsEnum.readingBooks,
	UserLibraryFieldsEnum.watchedShelves,
	UserLibraryFieldsEnum.hiddenShelves
]




export const idSelect = {
	select: { id: true }
}
