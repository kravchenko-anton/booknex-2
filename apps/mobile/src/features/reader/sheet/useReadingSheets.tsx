import ChaptersList from '@/features/reader/sheet/chapters-list/chapters-list'
import ReadingSettings from '@/features/reader/sheet/reading/reading-settings'
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
