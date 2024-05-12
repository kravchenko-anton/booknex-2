import type { WebViewMessageEvent } from 'react-native-webview';
export declare enum ReaderMessageType {
    Scroll = "scroll",
    SelectionLimitFail = "selection-limit-fail",
    FinishLoading = "finish-loading",
    FinishBook = "finishBook"
}
export interface WebviewMessageType {
    type: ReaderMessageType;
    payload: {
        scrollTop: number;
        progress: number;
        chapter: {
            chapterLink: string;
            chapterProgress: number;
        };
    };
}
export interface ReaderMessageProperties {
    onScroll: (payload: WebviewMessageType['payload']) => void;
    finishReadingLoading: boolean;
    onFinishBookPress: () => void;
    onContentLoadEnd: () => void;
}
export declare const useReaderMessage: ({ onFinishBookPress, onContentLoadEnd, onScroll, finishReadingLoading }: ReaderMessageProperties) => {
    onMessage: (event: WebViewMessageEvent) => Promise<void>;
};
