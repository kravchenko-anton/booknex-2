import { type ThemePackType } from '@/screens/reading/utils/theme-pack';
export declare const fontSizeSettings: {
    min: number;
    max: number;
};
export declare const ReaderFont: {
    title: string;
    fontFamily: string;
}[];
export interface CustomizationStoreType {
    colorScheme: ThemePackType;
    font: {
        title: string;
        fontFamily: string;
    };
    fontSize: number;
    lineHeight: 1.3 | 1.5 | 1.8;
    padding: 14 | 4 | 20;
}
export interface CustomizationStoreActionsType {
    changeTheme: (payload: ThemePackType['slug']) => void;
    changeLineHeight: (payload: 1.3 | 1.5 | 1.8) => void;
    changePadding: (payload: 14 | 4 | 20) => void;
    changeFontFamily: (payload: (typeof ReaderFont)[number]) => void;
    changeFontSize: (payload: number) => void;
}
export declare const initialState: CustomizationStoreType;
export declare const useCustomizationStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<CustomizationStoreType & CustomizationStoreActionsType>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<CustomizationStoreType & CustomizationStoreActionsType, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: CustomizationStoreType & CustomizationStoreActionsType) => void) => () => void;
        onFinishHydration: (fn: (state: CustomizationStoreType & CustomizationStoreActionsType) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<CustomizationStoreType & CustomizationStoreActionsType, unknown>>;
    };
}>;
