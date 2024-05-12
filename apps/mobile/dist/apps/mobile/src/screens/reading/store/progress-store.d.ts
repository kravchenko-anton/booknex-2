export interface ReadingHistoryType {
    id: string;
    bookSlug: string;
    startProgress: number;
    endProgress: number;
    progressDelta: number;
    scrollPosition: number;
    startDate: Date;
    endDate: Date;
    readingTimeMs: number;
    startFromReadingScreen: boolean;
}
interface ReadingProgressStoreType {
    history: ReadingHistoryType[];
}
interface ReadingProgressStoreActionsType {
    newProgress: (history: ReadingHistoryType) => void;
    clearHistory: () => void;
    updateStartFromReadingScreen: (data: Pick<ReadingHistoryType, 'id'> & {
        startFromReadingScreen: boolean;
    }) => void;
}
export declare const useReadingProgressStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<ReadingProgressStoreType & ReadingProgressStoreActionsType>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ReadingProgressStoreType & ReadingProgressStoreActionsType, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ReadingProgressStoreType & ReadingProgressStoreActionsType) => void) => () => void;
        onFinishHydration: (fn: (state: ReadingProgressStoreType & ReadingProgressStoreActionsType) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ReadingProgressStoreType & ReadingProgressStoreActionsType, unknown>>;
    };
}>;
export {};
