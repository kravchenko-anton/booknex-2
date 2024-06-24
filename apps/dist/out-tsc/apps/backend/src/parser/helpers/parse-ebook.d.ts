import { type Page } from 'puppeteer';
export declare const ignoredManifest: string[];
export declare const useParser: () => Promise<{
    page: Page;
    browser: import("puppeteer").Browser;
}>;
export declare const parseBookTable: (page: Page, url: string, pageToGo: number) => Promise<{
    id: number;
    link: string;
    ratingAvg: number;
}[]>;
export declare const parseCurrentBook: (page: Page, url: string) => Promise<{
    title: string;
    author: {
        name: string;
    };
    description: string;
    rating: number;
    picture: string;
    genres: (string | null)[];
}>;
