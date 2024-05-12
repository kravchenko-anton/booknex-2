import type { ReadingProgressType } from '@/screens/reading/hooks/useReadingProgress';
import type { ThemePackType } from '@/screens/reading/utils/theme-pack';
import type { FunctionType } from 'global/types';
import type { FC } from 'react';
interface ReaderMenuProperties {
    visible: boolean;
    onChapterIconPress: FunctionType;
    onSelectThemeIconPress: FunctionType;
    colorScheme: ThemePackType;
    readingProgress: ReadingProgressType;
}
declare const ReaderHeader: FC<ReaderMenuProperties>;
export default ReaderHeader;
