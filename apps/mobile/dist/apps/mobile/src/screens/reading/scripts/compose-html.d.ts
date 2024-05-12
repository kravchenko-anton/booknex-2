interface ComposeReaderViewHtmlProperties {
    title: string;
    picture: string;
    file: string[];
    defaultProperties: {
        scrollPosition: number;
        theme: string;
    };
}
export declare const composeReaderViewHtml: ({ title, picture, file, defaultProperties }: ComposeReaderViewHtmlProperties) => string;
export {};
