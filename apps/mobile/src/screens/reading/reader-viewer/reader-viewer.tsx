import { useReader } from '@/screens/reading/reader-context';
import { doublePressFunction } from '@/screens/reading/reader-viewer/double-press.function';
import { textSelectFunction } from '@/screens/reading/reader-viewer/text-select.function';
import { readerActions, ViewerHtml } from '@/screens/reading/reader-viewer/viewer.function';
import { windowHeight, windowWidth } from '@/utils/dimensions';
import { Color } from 'global/colors';
import type { FunctionType } from 'global/types';
import type { FC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import WebView from 'react-native-webview';

export interface ReaderViewerProperties {
  readerUiVisible: boolean;
  handleDoublePress: FunctionType;
  file: string[];
  picture: string;
  title: string;
}

const ReaderViewer: FC<ReaderViewerProperties> = (properties) => {
  const { defaultProperties, onMessage, reference } = useReader();
  if (!defaultProperties) return <View />;

  return (
    <View className='m-0 h-screen w-full items-center justify-center p-0'>
      <TouchableWithoutFeedback onPress={() => doublePressFunction(properties.handleDoublePress)}>
        <WebView
          scrollEnabled
          javaScriptEnabled
          startInLoadingState
          ref={reference}
          originWhitelist={['*']}
          renderLoading={() => <View className='h-screen w-screen' />}
          showsVerticalScrollIndicator={false}
          injectedJavaScriptBeforeContentLoaded={readerActions}
          className='bottom-0 left-0 right-0 top-0 z-10 m-0 p-0'
          menuItems={[
            { label: 'Copy', key: 'copy' },
            {
              label: 'Share',
              key: 'share'
            },
            { label: 'Translate', key: 'Translate' }
          ]}
          source={{
            baseUrl: '',
            html: ViewerHtml({
              defaultProperties: {
                scrollPosition: defaultProperties.scrollPosition,
                theme: defaultProperties.defaultTheme
              },
              file: properties.file,
              picture: properties.picture,
              title: properties.title
            })
          }}
          style={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor: Color.background
          }}
          onMessage={onMessage}
          onCustomMenuSelection={async (event) => {
            await textSelectFunction(
              event,
              reference.current?.injectJavaScript(`
							document.getSelection().removeAllRanges()
						`)
            );
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
export default ReaderViewer;
