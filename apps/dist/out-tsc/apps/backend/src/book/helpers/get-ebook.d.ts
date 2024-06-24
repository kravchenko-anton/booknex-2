import type { EBookPayloadType } from 'global/validation/ebook/ebook.schema';
import type { StoredEBook } from '../ebook/ebook.dto';
export declare const wordsPerMinute = 200;
export declare const charactersPerPage = 2000;
export declare const useEbookCalculation: (ebooks: EBookPayloadType[]) => {
    readingTime: number;
    uploadedEbook: StoredEBook[];
    pagesCount: number;
    chaptersCount: number;
};
