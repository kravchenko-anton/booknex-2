import type { Prisma } from '@prisma/client'

export type UserLibraryCategoryType = keyof Pick<
	Prisma.UserSelect,
	'finishedBooks' | 'readingBooks' | 'savedBooks'
>
export enum UserLibraryFieldsEnum {
	finishedBooks = 'finishedBooks',
	readingBooks = 'readingBooks',
	savedBooks = 'savedBooks'
}

export enum ActivityEnum {
	Started_Reading = 'Started Reading',
	Finished_Reading = 'Finished Reading',
	Add_To_Saved = 'Add To Saved',
	Remove_From_Saved = 'Remove From Saved',
	Visit_App = 'Visit App',
	Visit_Book = 'Visit Book',
	Get_Ebook = 'Get Ebook'
}

export const idSelect = {
	select: { id: true }
}
