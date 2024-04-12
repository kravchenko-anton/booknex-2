import api from '@/api'
import { useTypedRoute } from '@/hooks'
import ReaderChapters from '@/screens/reading/reader-chapters/reader-chapters'
import { ReadingProvider } from '@/screens/reading/reader-context'
import ReaderCustomization from '@/screens/reading/reader-customization/reader-customization'
import ReaderMenu from '@/screens/reading/reader-menu'
import ReaderViewer from '@/screens/reading/reader-viewer/reader-viewer'
import { useReaderModal } from '@/screens/reading/useReaderModal'
import { Loader } from '@/ui'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import type WebView from 'react-native-webview'

const Reader = () => {
	const { params } = useTypedRoute<'Reader'>()
	const slug = params.slug

	const { data: ebook } = useQuery({
		queryKey: ['e-books', slug],
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data
	})
	const [readerUiVisible, setReaderUiVisible] = useState(false)
	const viewerReference = useRef<WebView>(null)

	const { chaptersListModalReference, readingSettingsModalReference } =
		useReaderModal(setReaderUiVisible)
	if (!ebook) return <Loader />
	return (
		<ReadingProvider slug={slug}>
			<ReaderViewer
				title={ebook.title}
				picture={ebook.picture}
				file={ebook.file}
				ref={viewerReference}
				readerUiVisible={readerUiVisible}
				handleDoublePress={() => setReaderUiVisible(!readerUiVisible)}
			/>
			<ReaderMenu
				visible={readerUiVisible}
				onChapterIconPress={() => chaptersListModalReference.current?.present()}
				onSelectThemeIconPress={() =>
					readingSettingsModalReference.current?.present()
				}
			/>

			<ReaderChapters
				chapters={ebook.chapters}
				sheetRef={chaptersListModalReference}
				changeChapter={link =>
					viewerReference.current?.injectJavaScript(
						`window.location.hash = '${link}'`
					)
				}
			/>

			<ReaderCustomization sheetRef={readingSettingsModalReference} />
		</ReadingProvider>
	)
}

export default Reader
