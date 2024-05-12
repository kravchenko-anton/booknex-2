import type { ThemePackType } from '@/screens/reading/utils/theme-pack';
import { type FC } from 'react';
interface FontStyleSettingsProperties {
    activeFont: {
        fontFamily: string;
        title: string;
    };
    changeFontFamily: (font: {
        fontFamily: string;
        title: string;
    }) => void;
    colorScheme: ThemePackType;
}
export declare const FontStyleSettings: FC<FontStyleSettingsProperties>;
export {};
