import type { WebviewMessageType } from '@/screens/reading/hooks/useReaderMessage';
interface ReadingProgressProperties {
    slug: string;
    readerLoading: boolean;
    initialScrollPosition: number;
}
export interface ReadingProgressType {
    progress: number;
    chapter: {
        link: string;
        progress: number;
    };
}
export declare const useReadingProgress: ({ readerLoading, slug, initialScrollPosition }: ReadingProgressProperties) => {
    scrollPosition: number;
    readingProgress: ReadingProgressType;
    updateReadingProgress: (payload: WebviewMessageType['payload']) => void;
    clearProgress: () => void;
};
export {};
