export interface ThemePackType {
    title: string;
    slug: string;
    statusBar: 'light' | 'dark';
    colorPalette: {
        primary: string;
        secondary: string;
        textSelection: string;
        background: {
            normal: string;
            lighter: string;
            darker: string;
        };
        text: string;
    };
}
export declare const themePack: ThemePackType[];
