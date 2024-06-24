export declare const catalogSearchFields: (query: string) => {
    isPublic: true;
    OR: ({
        title: {
            mode: "insensitive";
            contains: string;
        };
        author?: undefined;
    } | {
        author: {
            contains: string;
            mode: "insensitive";
        };
        title?: undefined;
    })[];
};
