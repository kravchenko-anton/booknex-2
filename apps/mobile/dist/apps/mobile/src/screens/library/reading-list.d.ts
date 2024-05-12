import type { ReadingHistoryType } from '@/screens/reading/store/progress-store';
import type { UserLibraryOutputReadingBooksInner } from 'global/api-client';
import type { FC } from 'react';
interface ReadingListProperties {
    data: UserLibraryOutputReadingBooksInner[];
    history: ReadingHistoryType[];
    navigate: any;
}
export declare const ReadingList: FC<ReadingListProperties>;
export {};
