import { type ThemePackType } from '@/screens/reading/utils/theme-pack';
import { type FC } from 'react';
interface ThemeStyleSettingsProperties {
    changeTheme: (slug: string) => void;
    colorScheme: ThemePackType;
}
export declare const ThemeStyleSettings: FC<ThemeStyleSettingsProperties>;
export {};
