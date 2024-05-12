import { useTypedRoute } from '@/hooks';
import ReaderChapters from '@/screens/reading/chapters-modal/reader-chapters';
import { useReader } from '@/screens/reading/hooks/useReader';
import ReaderCustomization from '@/screens/reading/reader-customization/reader-customization';
import ReaderHeader from '@/screens/reading/reader-header/reader-header';
import ReaderViewer from '@/screens/reading/reader-viewer/reader-viewer';
import { Loader } from '@/ui';
import { AnimatedView } from '@/ui/animated-components';
import { screenHeight } from '@/utils/dimensions';
const Reader = () => {
    const { params } = useTypedRoute();
    const { colorScheme, setReaderHeaderVisible, chaptersListModalReference, defaultProperties, ebook, loaderAnimation, onMessage, readerHeaderVisible, readingProgress, readingSettingsModalReference, styleTag, viewerReference } = useReader(params.slug, params.initialScrollPosition);
    if (!ebook)
        return <Loader background={colorScheme.colorPalette.background.normal}/>;
    console.log('ebook');
    return (<>
			<AnimatedView pointerEvents='none' className='absolute z-50 h-full w-full' style={[
            loaderAnimation,
            {
                backgroundColor: colorScheme.colorPalette.background.normal,
                height: screenHeight
            }
        ]}>
				<Loader background={colorScheme.colorPalette.background.normal}/>
			</AnimatedView>
			<ReaderViewer colorScheme={colorScheme} styleTag={styleTag} defaultProperties={defaultProperties} title={ebook.title} picture={ebook.picture} file={ebook.file} ref={viewerReference} readerUiVisible={readerHeaderVisible} handleDoublePress={() => setReaderHeaderVisible(!readerHeaderVisible)} onMessage={onMessage}/>
			<ReaderHeader colorScheme={colorScheme} readingProgress={readingProgress} visible={readerHeaderVisible} onChapterIconPress={() => chaptersListModalReference.current?.present()} onSelectThemeIconPress={() => readingSettingsModalReference.current?.present()}/>

			<ReaderChapters activeChapter={readingProgress.chapter} colorScheme={colorScheme} chapters={ebook.chapters} sheetRef={chaptersListModalReference} changeChapter={link => {
            console.log('link', link);
            viewerReference.current?.injectJavaScript(`
						document.getElementById('${link}')?.scrollIntoView({ behavior: 'smooth' })`);
        }}/>

			<ReaderCustomization sheetRef={readingSettingsModalReference}/>
		</>);
};
export default Reader;
//# sourceMappingURL=reader.js.map