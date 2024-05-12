export declare const useSearch: () => {
    books: import("global/api-client").ShortBook[] | undefined;
    clearSearch: () => void;
    booksLoading: boolean;
    control: import("react-hook-form").Control<import("@/screens/search/useSearchForm").SearchFormDataType, any>;
    searchTerm: string;
};
