import { onTextSelection } from '@/screens/reading/functions/on-text-selection';
import { composeReaderViewHtml } from '@/screens/reading/scripts/compose-html';
import { injectStyle } from '@/screens/reading/scripts/styles-injection';
import { selectTextMenu } from '@/screens/reading/utils/text-select-menu';
import { windowWidth } from '@/utils/dimensions';
import { doublePress } from '@/utils/handleDoublePress';
import { forwardRef, useEffect } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import WebView from 'react-native-webview';
const ReaderViewer = forwardRef((properties, reference) => {
    const { defaultProperties, styleTag, handleDoublePress, colorScheme, title, onMessage, picture, file } = properties;
    useEffect(() => {
        reference.current?.injectJavaScript(`${injectStyle(styleTag)}`);
    }, [styleTag]);
    if (!defaultProperties)
        return <View className='flex-1'/>;
    return (<View className='m-0 h-screen w-screen flex-1 items-center justify-center p-0'>
				<TouchableWithoutFeedback onPress={doublePress(handleDoublePress)}>
					<WebView scrollEnabled javaScriptEnabled startInLoadingState ref={reference} 
    // prevent fast scroll in webview
    androidLayerType='hardware' decelerationRate={0.8} originWhitelist={['*']} showsVerticalScrollIndicator={false} className='bottom-0 left-0 right-0 top-0 z-10 m-0 p-0' menuItems={selectTextMenu} renderLoading={() => (<View className='h-screen w-screen' style={{
                backgroundColor: colorScheme.colorPalette.background.normal
            }}/>)} 
    // prevent fast scroll in webview
    source={{
            baseUrl: '',
            html: composeReaderViewHtml({
                defaultProperties,
                file,
                picture,
                title
            })
        }} style={{
            width: windowWidth,
            backgroundColor: colorScheme.colorPalette.background.normal
        }} onMessage={onMessage} onCustomMenuSelection={async (event) => {
            await onTextSelection(event, reference?.current?.injectJavaScript(`
							document.getSelection().removeAllRanges()
						`));
        }}/>
				</TouchableWithoutFeedback>
			</View>);
});
export default ReaderViewer;
//# sourceMappingURL=reader-viewer.js.map