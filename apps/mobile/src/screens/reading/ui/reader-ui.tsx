import ChapterList from '@/screens/reading/ui/chapter-list/chapter-list'
import ReaderBar from '@/screens/reading/ui/reader-bar'
import ReadingSettings from '@/screens/reading/ui/reading/reading-settings'
import type { ThemePackType } from '@/screens/reading/ui/reading/theme-pack'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { OutputChapter } from 'global/api-client'
import { useRef, type FC } from 'react'

const ReaderUi: FC<{
	title: string
	visible: boolean
	chapters: OutputChapter[]
	onChapterPress: (id: string) => void
	progress: number
	colorPalette: ThemePackType['colorPalette']
}> = ({
	chapters,
	onChapterPress,
	visible = false,
	title = '',
	progress = 0
}) => {
	const chaptersListModalReference = useRef<BottomSheetModal>(null)
	const readingSettingsModalReference = useRef<BottomSheetModal>(null)
	return (
		<>
			<ReaderBar
				visible={visible}
				progress={progress}
				title={title}
				onChapterIconPress={() => chaptersListModalReference.current?.present()}
				onSelectThemeIconPress={() =>
					readingSettingsModalReference.current?.present()
				}
			/>

			<ChapterList
				chapters={chapters}
				SheetRef={chaptersListModalReference}
				openChapter={(chapterId: string) => onChapterPress(chapterId)}
			/>

			<ReadingSettings sheetRef={readingSettingsModalReference} />
		</>
	)
}

export default ReaderUi
