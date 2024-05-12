import type { ThemePackType } from '@/screens/reading/utils/theme-pack';
import type { FC } from 'react';
interface FontSizeSettingsProperties {
    activeFontSize: number;
    changeFontSize: (size: number) => void;
    colorScheme: ThemePackType;
}
export declare const FontSizeSettings: FC<FontSizeSettingsProperties>;
export {};
