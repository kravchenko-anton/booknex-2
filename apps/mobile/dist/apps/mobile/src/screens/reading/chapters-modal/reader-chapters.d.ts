import type { ReadingProgressType } from '@/screens/reading/hooks/useReadingProgress';
import type { ThemePackType } from '@/screens/reading/utils/theme-pack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { EbookOutputChaptersInner } from 'global/api-client';
import { type FC } from 'react';
export interface ReaderChaptersProperties {
    sheetRef: React.RefObject<BottomSheetModal>;
    chapters: EbookOutputChaptersInner[];
    changeChapter: (link: string) => void;
    colorScheme: ThemePackType;
    activeChapter: ReadingProgressType['chapter'];
}
declare const ReaderChapters: FC<ReaderChaptersProperties>;
export default ReaderChapters;
