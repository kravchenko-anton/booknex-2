/// <reference types="react" />
declare const CatalogList: ({ data, disabledScroll, onElementPress }: {
    disabledScroll?: boolean | undefined;
    data: {
        slug: string;
        title: string;
        picture: string;
    }[];
    onElementPress?: ((slug: string) => void) | undefined;
}) => import("react").JSX.Element;
export default CatalogList;
