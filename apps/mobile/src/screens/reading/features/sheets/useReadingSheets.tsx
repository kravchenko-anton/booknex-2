import ChaptersList from '@/screens/reading/features/sheets/chapters-list/chapters-list'
import ReadingSettings from '@/screens/reading/features/sheets/reading/reading-settings'
import type { ChaptersType } from 'global/services-types/book-types'

export const useReadingSheets = () => {
	const { showBottomSheet, closeBottomSheet } = {
		showBottomSheet: (component: JSX.Element) => {
			console.log('showBottomSheet', component)
		},
		closeBottomSheet: () => {}
	}

	const openReadingSettings = () =>
		showBottomSheet(<ReadingSettings close={closeBottomSheet} />)
	const openChapterList = ({
		chapters,
		openChapter
	}: {
		chapters: ChaptersType
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
