import type { ThemePackType } from '@/screens/reading/utils/theme-pack';
export declare const injectStyle: (style: string) => string;
export declare const getStyleTag: ({ colorPalette, fontFamily, fontSize, lineHeight, padding }: {
    colorPalette: ThemePackType['colorPalette'];
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    padding: number;
}) => string;
