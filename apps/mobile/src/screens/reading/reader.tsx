import { useTypedRoute } from '@/hooks'
import ReaderChapters from '@/screens/reading/chapters-modal/reader-chapters'
import ReaderCustomization from '@/screens/reading/reader-customization/reader-customization'
import ReaderMenu from '@/screens/reading/reader-menu/reader-menu'
import ReaderViewer from '@/screens/reading/reader-viewer/reader-viewer'
import { useReader } from '@/screens/reading/useReader'
import { Loader } from '@/ui'
import { AnimatedView } from '@/ui/animated-components'
import { screenHeight } from '@/utils/dimensions'

const Reader = () => {
	const { params } = useTypedRoute<'Reader'>()
	const reader = useReader(params.slug, params.initialScrollPosition)
	if (!reader.ebook || reader.ebookRequestLoading)
		return (
			<Loader background={reader.colorScheme.colorPalette.background.normal} />
		)

	return (
		<>
			<AnimatedView
				pointerEvents='none'
				className='absolute z-50 h-full w-full'
				style={[
					reader.loaderAnimation,
					{
						backgroundColor: reader.colorScheme.colorPalette.background.normal,
						height: screenHeight
					}
				]}>
				<Loader
					background={reader.colorScheme.colorPalette.background.normal}
				/>
			</AnimatedView>
			<ReaderViewer
				colorScheme={reader.colorScheme}
				defaultProperties={reader.defaultProperties}
				title={reader.ebook.title}
				picture={reader.ebook.picture}
				file={reader.ebook.file}
				ref={reader.viewerReference}
				readerUiVisible={reader.readerHeaderVisible}
				handleDoublePress={() =>
					reader.setReaderHeaderVisible(!reader.readerHeaderVisible)
				}
				onMessage={reader.onMessage}
			/>
			<ReaderMenu
				colorScheme={reader.colorScheme}
				readingProgress={reader.readingProgress}
				bookTitle={reader.ebook.title}
				visible={
					reader.readerHeaderVisible && !reader.readerLoading
						? !reader.ebookRequestLoading
						: false
				}
				onChapterIconPress={() => reader.openModal.chaptersList()}
				onSelectThemeIconPress={() => reader.openModal.readingSettings()}
				onProgressChange={value =>
					reader.viewerReference.current?.injectJavaScript(`
					 scrollToProgress("${value}")
				`)
				}
			/>

			<ReaderChapters
				activeChapter={reader.readingProgress.chapter}
				colorScheme={reader.colorScheme}
				chapters={reader.ebook.chapters}
				sheetRef={reader.modalRefs.chaptersListModalReference}
				changeChapter={link => {
					console.log('link', link)
					reader.viewerReference.current?.injectJavaScript(
						`
						document.getElementById('${link}')?.scrollIntoView({ behavior: 'smooth' })`
					)
				}}
			/>

			<ReaderCustomization
				sheetRef={reader.modalRefs.readingSettingsModalReference}
			/>
		</>
	)
}

export default Reader
