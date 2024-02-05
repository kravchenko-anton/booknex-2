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
	Check_Catalog = 'Check Catalog',
	Feedback_Book = 'Feedback Book',
	Visit_Book = 'Visit Book',
	Create_Book = 'Create Book',
	Update_Book = 'Update Book',
	Visit_Genre = 'Visit Genre',
	Visit_Collection = 'Visit Collection',
	Get_Ebook = 'Get Ebook',
	Update_Recommendations = 'Update Recommendations',
	'Register_New_User' = 'Register New User',
	'Login_User' = 'Login User'
}

export const idSelect = {
	select: { id: true }
}
