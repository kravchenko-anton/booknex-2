import type { ShortBookType } from '@/services/types/book-service-types'
import type { ShortShelfType } from '@/services/types/shelf-service-types'
import type { DefaultModelFields, IconType } from '@/types/global'

export interface UserProfileTypes
	extends Pick<UserType, 'email' | 'name' | 'picture'> {
	statistics: UserStatisticsType
}
export type UserStatisticsType = [
	{
		count: number,
		icon: IconType
		name: 'Books read'
	},
	{
		count: number,
		icon: IconType
		name: 'Pages read'
	},
	{
		count: string,
		icon: IconType
		name: 'Time in read'
	},
	{
		count: string,
		icon: IconType
		name: 'Reading speed'
	}
]
export interface UserType extends DefaultModelFields, UserLibraryFieldsType {
	email: string
	isAdmin: boolean,
	name: string,
	picture: string
}
export interface UserLibraryFieldsType {
	finishedBooks: ShortBookType[],
	hiddenShelves: ShortShelfType[]
	readingBooks: ShortBookType[],
	watchedShelves: ShortShelfType[]
}

export const DesignationType = {
	finishedBooks: 'book',
	readingBooks: 'book',
	watchedShelves: 'shelf',
	hiddenShelves: 'shelf'
}

type UserLibraryElementType = {
	count: number,
	icon: IconType,
	name: string,
	type: keyof UserLibraryFieldsType
}

export type GetMoreType<T extends keyof UserLibraryFieldsType> = {
	title: string
} & Record<keyof UserLibraryFieldsType, UserLibraryFieldsType[T]>

export type UserLibraryType = {
	books: UserLibraryElementType[]
	shelves: UserLibraryElementType[]
}
