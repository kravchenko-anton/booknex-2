import { useBottomSheetContext } from '@/providers/bottom-sheet-provider'
import ChaptersList from '@/screens/reading/settings/sheet/chapters-list/chapters-list'
import ReadingSettings from '@/screens/reading/settings/sheet/reading/reading-settings'
import SelectTheme from '@/screens/reading/settings/sheet/select-theme/select-theme'
import { WINDOW_HEIGHT } from '@/utils/dimensions'
import React from 'react'

export const useReadingSheets = ({
	activeThemeSlug
}: {
	activeThemeSlug: string
}) => {
	const { showBottomSheet } = useBottomSheetContext()

	const openSelectTheme = () =>
		showBottomSheet({
			component: <SelectTheme activeThemeSlug={activeThemeSlug} />,
			snapPoints: [WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 1.4]
		})
	const openReadingSettings = () =>
		showBottomSheet({
			component: (
				<ReadingSettings
					activeThemeSlug={activeThemeSlug}
					openSelectTheme={openSelectTheme}
				/>
			),
			snapPoints: [230, 230]
		})
	const openChapterList = ({
		chapters,
		openChapter
	}: {
		chapters: any
		openChapter: (chapterId: string) => void
	}) =>
		showBottomSheet({
			component: <ChaptersList chapters={chapters} openChapter={openChapter} />,
			snapPoints: [WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 1.4]
		})

	return {
		openReadingSettings,
		openChapterList
	}
}
