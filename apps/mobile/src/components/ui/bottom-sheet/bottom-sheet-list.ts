import ChaptersList from '@/screens/reading/settings/sheet/chapters-list/chapters-list'
import ReadingSettings from '@/screens/reading/settings/sheet/reading/reading-settings'
import ReaderSearch from '@/screens/reading/settings/sheet/search/reader-search'
import SelectTheme from '@/screens/reading/settings/sheet/select-theme/select-theme'
import type { FC } from 'react'

// TODO: разделить на страницы

export enum BottomSheetListPagesEnum {
	reader = 'reader'
}
export enum BottomSheetListEnum {
	readerSettings = 'reader/settings',
	readerSearch = 'reader/Search',
	readerNoteBook = 'reader/NoteBook',
	readerChapters = 'reader/Chapters',
	readerSelectTheme = 'reader/Select-theme'
}

export interface SheetType {
	name: BottomSheetListEnum
	snapPoints: (string | number)[]
	component: FC
}
export const BottomSheetList: SheetType[] = [
	{
		name: BottomSheetListEnum.readerSettings,
		snapPoints: [300],
		component: ReadingSettings
	},
	{
		name: BottomSheetListEnum.readerSearch,
		snapPoints: ['60%', '80%', '100%'],
		component: ReaderSearch
	},
	{
		name: BottomSheetListEnum.readerSelectTheme,
		snapPoints: ['50%', '90%'],
		component: SelectTheme
	},
	{
		name: BottomSheetListEnum.readerNoteBook,
		snapPoints: ['50%', '90%'],
		component: SelectTheme
	},
	{
		name: BottomSheetListEnum.readerChapters,
		snapPoints: ['50%', '90%'],
		component: ChaptersList
	}
]
