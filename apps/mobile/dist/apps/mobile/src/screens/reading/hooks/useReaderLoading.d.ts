/// <reference types="react" />
export declare const useReaderLoading: () => {
    loaderAnimation: {
        opacity: 0 | 1;
        transform: {
            scale: 0 | 1;
        }[];
    };
    readerLoading: boolean;
    setReaderLoading: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
