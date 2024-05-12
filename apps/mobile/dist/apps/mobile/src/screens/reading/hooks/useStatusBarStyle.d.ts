import type { ThemePackType } from '@/screens/reading/utils/theme-pack';
interface StatusBarStyleProperties {
    colorScheme: ThemePackType;
    readerUiVisible: boolean;
}
export declare const useStatusBarStyle: ({ colorScheme, readerUiVisible }: StatusBarStyleProperties) => void;
export {};
