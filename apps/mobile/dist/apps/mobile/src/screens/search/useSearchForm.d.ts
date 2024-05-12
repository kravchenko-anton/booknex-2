export interface SearchFormDataType {
    searchTerm: string;
}
export declare const useSearchForm: () => {
    searchTerm: string;
    debouncedSearchTerm: string;
    control: import("react-hook-form").Control<SearchFormDataType, any>;
    clearSearch: () => void;
};
