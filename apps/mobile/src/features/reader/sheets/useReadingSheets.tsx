import ChaptersList from '@/features/reader/sheets/chapters-list/chapters-list'
import ReadingSettings from '@/features/reader/sheets/reading/reading-settings'
import { useBottomSheetContext } from '@/shared/providers/bottom-sheet-provider'
import React from 'react'
import type { ChapterType } from '../../../../../backend/types'

export const useReadingSheets = () => {
	const { showBottomSheet, closeBottomSheet } = useBottomSheetContext()

	const openReadingSettings = () =>
		showBottomSheet(<ReadingSettings close={closeBottomSheet} />)
	const openChapterList = ({
		chapters,
		openChapter
	}: {
		chapters: ChapterType[]
		openChapter: (chapterId: string) => void
	}) =>
		showBottomSheet(
			<ChaptersList
				chapters={chapters}
				close={closeBottomSheet}
				openChapter={openChapter}
			/>
		)

	return {
		openReadingSettings,
		openChapterList
	}
}
