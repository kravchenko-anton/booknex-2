import ReaderChapters from '@/screens/reading/reader-chapters/reader-chapters'
import ReaderCustomization from '@/screens/reading/reader-customization/reader-customization'
import ReaderMenu from '@/screens/reading/reader-menu'
import ReaderViewer from '@/screens/reading/reader-viewer/reader-viewer'
import { useReader } from '@/screens/reading/reading-context'
import { Loader } from '@/ui'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
//TODO: переделать реадер на контекст и сделать его в 100 раз красивее

const Reader = () => {
	const [readerUiVisible, setReaderUiVisible] = useState(false)
	const chaptersListModalReference = useRef<BottomSheetModal>(null)
	const readingSettingsModalReference = useRef<BottomSheetModal>(null)

	const { ebook, initialScroll, onMessage, reference, styleTag } = useReader()
	if (!ebook || !styleTag) return <Loader />
	return (
		<SafeAreaView className='flex-1'>
			<ReaderViewer
				ref={reference}
				initialScroll={initialScroll}
				readerUiVisible={readerUiVisible}
				handleDoublePress={() => setReaderUiVisible(!readerUiVisible)}
				onMessage={onMessage}
			/>
			<ReaderMenu
				visible={readerUiVisible}
				onChapterIconPress={() => chaptersListModalReference.current?.present()}
				onSelectThemeIconPress={() =>
					readingSettingsModalReference.current?.present()
				}
			/>
			{/* {TODO: вынести это всё} */}
			<ReaderChapters
				chapters={ebook.chapters}
				sheetRef={chaptersListModalReference}
				openChapter={(chapterId: string) => {
					reference.current?.injectJavaScript(
						`window.location.hash = '${chapterId}'`
					)
				}}
			/>

			<ReaderCustomization sheetRef={readingSettingsModalReference} />
		</SafeAreaView>
	)
}

export default Reader
