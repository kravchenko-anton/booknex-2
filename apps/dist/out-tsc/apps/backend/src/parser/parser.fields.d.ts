export declare const parserCatalogFields: ({ page, perPage, searchTerm }: {
    page: number;
    perPage: number;
    searchTerm: string;
}) => {
    readonly where?: {
        OR: ({
            author: {
                contains: string;
                mode: "insensitive";
            };
            title?: undefined;
        } | {
            title: {
                contains: string;
                mode: "insensitive";
            };
            author?: undefined;
        })[];
        id?: undefined;
    } | {
        id: string;
        OR?: undefined;
    } | undefined;
    readonly skip?: number | undefined;
    readonly take: number;
    readonly select: {
        title: true;
        slug: true;
        rating: true;
        description: true;
        author: true;
        genres: true;
        picture: true;
    };
};
export declare const bookTemplateByIdFields: (slug: string) => {
    where: {
        slug: string;
    };
    select: {
        title: true;
        slug: true;
        rating: true;
        description: true;
        author: true;
        picture: true;
        genres: true;
    };
};
