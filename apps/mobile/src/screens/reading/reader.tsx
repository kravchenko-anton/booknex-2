import api from '@/api'
import { useTypedRoute } from '@/hooks'
import ReaderChapters from '@/screens/reading/reader-chapters/reader-chapters'
import { ReadingProvider } from '@/screens/reading/reader-context'
import ReaderCustomization from '@/screens/reading/reader-customization/reader-customization'
import ReaderMenu from '@/screens/reading/reader-menu'
import ReaderViewer from '@/screens/reading/reader-viewer/reader-viewer'
import { Loader } from '@/ui'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Reader = () => {
	const { params } = useTypedRoute<'Reader'>()
	const id = +params.id
	const { data: ebook } = useQuery({
		queryKey: ['e-books', +params.id],
		queryFn: () => api.book.ebookById(+params.id),
		select: data => data.data
	})
	const [readerUiVisible, setReaderUiVisible] = useState(false)
	const chaptersListModalReference = useRef<BottomSheetModal>(null)
	const readingSettingsModalReference = useRef<BottomSheetModal>(null)

	if (!ebook) return <Loader />
	return (
		<ReadingProvider id={id}>
			<SafeAreaView className='flex-1'>
				<ReaderViewer
					title={ebook.title}
					picture={ebook.picture}
					file={ebook.file}
					readerUiVisible={readerUiVisible}
					handleDoublePress={() => setReaderUiVisible(!readerUiVisible)}
				/>
				<ReaderMenu
					visible={readerUiVisible}
					onChapterIconPress={() =>
						chaptersListModalReference.current?.present()
					}
					onSelectThemeIconPress={() =>
						readingSettingsModalReference.current?.present()
					}
				/>
				<ReaderChapters
					chapters={ebook.chapters}
					sheetRef={chaptersListModalReference}
				/>

				<ReaderCustomization sheetRef={readingSettingsModalReference} />
			</SafeAreaView>
		</ReadingProvider>
	)
}

export default Reader
