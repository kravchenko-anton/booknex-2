/// <reference types="react" />
import type { ThemePackType } from '@/screens/reading/utils/theme-pack';
import type { FunctionType } from 'global/types';
import { type WebViewMessageEvent } from 'react-native-webview';
export interface ReaderViewerProperties {
    readerUiVisible: boolean;
    handleDoublePress: FunctionType;
    file: string[];
    picture: string;
    title: string;
    defaultProperties: {
        scrollPosition: number;
        theme: string;
    };
    styleTag: string;
    colorScheme: ThemePackType;
    onMessage: (event: WebViewMessageEvent) => Promise<void>;
}
declare const ReaderViewer: import("react").ForwardRefExoticComponent<ReaderViewerProperties & import("react").RefAttributes<unknown>>;
export default ReaderViewer;
