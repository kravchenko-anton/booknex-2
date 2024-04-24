import api from '@/api'
import { useTypedRoute, useTypedSelector } from '@/hooks'
import { useFinishBook } from '@/screens/reading/features/finish-book/useFinishBook'
import { useReadingProgress } from '@/screens/reading/features/reader-progress/useReadingProgress'
import { useModalReference } from '@/screens/reading/hooks/useModalReference'
import { useReaderLoading } from '@/screens/reading/hooks/useReaderLoading'
import { useStatusBarStyle } from '@/screens/reading/hooks/useStatusBarStyle'
import { useStyleTag } from '@/screens/reading/hooks/useStyleTag'
import ReaderChapters from '@/screens/reading/reader-chapters/reader-chapters'
import ReaderCustomization from '@/screens/reading/reader-customization/reader-customization'
import ReaderHeader from '@/screens/reading/reader-header/reader-header'
import ReaderViewer from '@/screens/reading/reader-viewer/reader-viewer'
import { useReaderMessage } from '@/screens/reading/reader-viewer/useReaderMessage'
import { Loader } from '@/ui'
import { AnimatedView } from '@/ui/animated-components'
import { screenHeight } from '@/utils/dimensions'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useRef, useState } from 'react'
import type WebView from 'react-native-webview'
//TODO: сделать нормальную историю чтения
const Reader = () => {
	const {
		params: { slug }
	} = useTypedRoute<'Reader'>()
	const { data: ebook } = useQuery({
		queryKey: QueryKeys.ebook.bySlug(slug),
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data,
		enabled: !!slug
	})

	const { loaderAnimation, setReaderLoading, readerLoading } =
		useReaderLoading()
	const { colorScheme, ...restUiProperties } = useTypedSelector(
		state => state.readingUi
	)
	const [readerHeaderVisible, setReaderHeaderVisible] = useState(false)
	const viewerReference = useRef<WebView>(null)

	const {
		readingProgress,
		scrollPosition,
		updateReadingProgress,
		clearProgress
	} = useReadingProgress({ slug, readerLoading })

	const { finishReadingLoading, onFinish } = useFinishBook({
		slug,
		onFinishComplete: clearProgress
	})

	const { chaptersListModalReference, readingSettingsModalReference } =
		useModalReference(setReaderHeaderVisible)

	useStatusBarStyle({ colorScheme, readerUiVisible: readerHeaderVisible })
	const { onMessage } = useReaderMessage({
		finishReadingLoading,
		onFinishBookPress: onFinish,
		onContentLoadEnd: () => setReaderLoading(false),
		onScroll: updateReadingProgress
	})

	const { defaultProperties, styleTag } = useStyleTag(
		{ colorScheme, ...restUiProperties },
		scrollPosition
	)
	if (!ebook)
		return <Loader background={colorScheme.colorPalette.background.normal} />
	return (
		<>
			<AnimatedView
				pointerEvents='none'
				className='absolute z-50 h-full w-full'
				style={[
					loaderAnimation,
					{
						backgroundColor: colorScheme.colorPalette.background.normal,
						height: screenHeight
					}
				]}>
				<Loader background={colorScheme.colorPalette.background.normal} />
			</AnimatedView>
			<ReaderViewer
				colorScheme={colorScheme}
				styleTag={styleTag}
				defaultProperties={defaultProperties}
				title={ebook.title}
				picture={ebook.picture}
				file={ebook.file}
				ref={viewerReference}
				readerUiVisible={readerHeaderVisible}
				handleDoublePress={() => setReaderHeaderVisible(!readerHeaderVisible)}
				onMessage={onMessage}
			/>
			<ReaderHeader
				colorScheme={colorScheme}
				readingProgress={readingProgress}
				visible={readerHeaderVisible}
				onChapterIconPress={() => chaptersListModalReference.current?.present()}
				onSelectThemeIconPress={() =>
					readingSettingsModalReference.current?.present()
				}
			/>

			<ReaderChapters
				activeChapter={readingProgress.chapter}
				colorScheme={colorScheme}
				chapters={ebook.chapters}
				sheetRef={chaptersListModalReference}
				changeChapter={link =>
					viewerReference.current?.injectJavaScript(
						`
					document.getElementById('${link}')?.scrollIntoView({
						behavior: 'smooth'
					})
	
						`
					)
				}
			/>

			<ReaderCustomization sheetRef={readingSettingsModalReference} />
		</>
	)
}

export default Reader
