/// <reference types="react" />
import type WebView from 'react-native-webview';
export declare const useReader: (slug: string, initialScrollPosition: number) => {
    ebook: import("global/api-client").EbookOutput | undefined;
    readerLoading: boolean;
    loaderAnimation: {
        opacity: 0 | 1;
        transform: {
            scale: 0 | 1;
        }[];
    };
    readerHeaderVisible: boolean;
    colorScheme: import("../utils/theme-pack").ThemePackType;
    viewerReference: import("react").RefObject<WebView<{}>>;
    setReaderHeaderVisible: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    readingProgress: import("@/screens/reading/hooks/useReadingProgress").ReadingProgressType;
    chaptersListModalReference: import("react").RefObject<import("@gorhom/bottom-sheet/lib/typescript/types").BottomSheetModalMethods>;
    readingSettingsModalReference: import("react").RefObject<import("@gorhom/bottom-sheet/lib/typescript/types").BottomSheetModalMethods>;
    onMessage: (event: import("react-native-webview").WebViewMessageEvent) => Promise<void>;
    defaultProperties: {
        scrollPosition: number;
        theme: string;
    };
    styleTag: string;
};
