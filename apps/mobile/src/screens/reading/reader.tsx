import { useTypedRoute } from '@/hooks'
import { useReader } from '@/screens/reading/hooks/useReader'
import ReaderChapters from '@/screens/reading/reader-chapters/reader-chapters'
import ReaderCustomization from '@/screens/reading/reader-customization/reader-customization'
import ReaderHeader from '@/screens/reading/reader-header/reader-header'
import ReaderViewer from '@/screens/reading/reader-viewer/reader-viewer'
import { Loader } from '@/ui'
import { AnimatedView } from '@/ui/animated-components'
import { screenHeight } from '@/utils/dimensions'
//TODO: сделать нормальную историю чтения
const Reader = () => {
	const { params } = useTypedRoute<'Reader'>()
	const {
		colorScheme,
		setReaderHeaderVisible,
		chaptersListModalReference,
		defaultProperties,
		ebook,
		loaderAnimation,
		onMessage,
		readerHeaderVisible,
		readingProgress,
		readingSettingsModalReference,
		styleTag,
		viewerReference
	} = useReader(params.slug, params.initialScrollPosition)
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
						`document.getElementById('${link}')?.scrollIntoView({ behavior: 'smooth' })`
					)
				}
			/>

			<ReaderCustomization sheetRef={readingSettingsModalReference} />
		</>
	)
}

export default Reader
