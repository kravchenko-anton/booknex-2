import { useTypedRoute } from '@/hooks'
import ReaderChapters from '@/screens/reader/components/chapters-modal/reader-chapters'
import { ReactionInfo } from '@/screens/reader/components/reaction-info/reaction-info'
import ReaderCustomization from '@/screens/reader/components/reader-customization/reader-customization'
import { ReaderLoading } from '@/screens/reader/components/reader-loading'
import ReaderMenu from '@/screens/reader/components/reader-menu/reader-menu'
import ReaderViewer from '@/screens/reader/components/reader-viewer/reader-viewer'
import { useReader } from '@/screens/reader/functions/useReader'
import { Loader } from '@/ui'

const Reader = () => {
	const { params } = useTypedRoute<'Reader'>()

	const reader = useReader(params.slug, params.initialScrollPosition)
	if (!reader.ebook || reader.ebookRequestLoading)
		return (
			<Loader background={reader.colorScheme.colorPalette.background.normal} />
		)
	console.log(reader.readerLoading)
	return (
		<>
			<ReaderLoading
				loading={reader.readerLoading}
				backgroundColor={reader.colorScheme.colorPalette.background.normal}
			/>
			<ReaderViewer
				colorScheme={reader.colorScheme}
				defaultProperties={reader.defaultProperties}
				ref={reader.viewerReference}
				readerUiVisible={reader.readerHeaderVisible}
				handleDoublePress={() =>
					reader.setReaderHeaderVisible(!reader.readerHeaderVisible)
				}
				onMessage={reader.onMessage}
				{...reader.ebook}
			/>
			<ReaderMenu
				bookSlug={params.slug}
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
					reader.viewerReference.current?.injectJavaScript(
						`scrollToChapter("${link}")`
					)
				}}
			/>

			<ReaderCustomization
				sheetRef={reader.modalRefs.readingSettingsModalReference}
			/>
			<ReactionInfo
				slug={params.slug}
				colorScheme={reader.colorScheme}
				sheetRef={reader.modalRefs.reactionModalReference}
				activeReactionPressed={
					reader.reactionBookList.find(
						reaction =>
							Number(reaction.id) === Number(reader.activeReactionPressedId)
					) || null
				}
			/>
		</>
	)
}

export default Reader
