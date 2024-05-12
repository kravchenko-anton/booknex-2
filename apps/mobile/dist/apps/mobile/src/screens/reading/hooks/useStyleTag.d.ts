import type { CustomizationStoreType } from '@/screens/reading/store/customization-store';
export declare const useStyleTag: (properties: CustomizationStoreType, scrollPosition: number) => {
    styleTag: string;
    defaultProperties: {
        scrollPosition: number;
        theme: string;
    };
};
