export interface paths {
    "/api/user/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_profile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/user/library": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_library"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/user/start-reading/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["UserController_startReading"];
        trace?: never;
    };
    "/api/user/finish-reading/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["UserController_finishReading"];
        trace?: never;
    };
    "/api/user/toggle-save/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["UserController_toggleSave"];
        trace?: never;
    };
    "/api/user/is-saved/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_isSaved"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/user/admin/catalog": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_catalog"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/user/admin/remove/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["UserController_remove"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/catalog/search/{query}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["CatalogController_search"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/catalog/featured": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["CatalogController_featured"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/genre": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["GenreController_catalog"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/genre/by-slug/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["GenreController_bySlug"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/book/info/by-slug/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["BookController_infoBySlug"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/book/admin-info/by-slug/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["BookController_adminInfoBySlug"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/book/admin/catalog": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["BookController_catalog"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/book/admin/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["BookController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/book/admin/update/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["BookController_update"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/book/admin/remove/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["BookController_remove"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/google-sign": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_googleSign"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/mail-register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_mailRegister"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/mail-login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_mailLogin"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_refreshToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/storage/{folder}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["StorageController_upload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/parser/admin/catalog": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ParserController_catalog"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/parser/admin/by-slug/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ParserController_bySlug"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/parser/admin/parse": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["ParserController_parse"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/parser/admin/unfold": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["ParserController_unfold"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/parser/admin/remove/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["ParserController_remove"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/review/review/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["ReviewController_review"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/recommendation/update-recommendation": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["RecommendationController_updateRecommendation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/recommendation/recommendation-genre": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["RecommendationController_currentRecommendation"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["HealthController_check"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/ebook/ebook/by-slug/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["EbookController_ebookBySlug"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/ebook/admin/stored-ebook/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["EbookController_storedEbookBySlug"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        UserProfileOutput: {
            /** @example 1 */
            id: number;
            /** @example email */
            email: string;
        };
        ShortBook: {
            /**
             * @description book slug
             * @example 1
             */
            slug: string;
            /**
             * @description book title
             * @example title
             */
            title: string;
            /**
             * @description book picture
             * @example picture
             */
            picture: string;
            /**
             * @description book author
             * @example author
             */
            author: string;
        };
        UserLibraryOutput: {
            readingBooks: components["schemas"]["ShortBook"][];
            finishedBooks: components["schemas"]["ShortBook"][];
            savedBooks: components["schemas"]["ShortBook"][];
        };
        ShortGenre: {
            /**
             * @description genre slug
             * @example 1
             */
            slug: string;
            /**
             * @description genre name
             * @example name
             */
            name: string;
            /**
             * @description genre icon
             * @example icon
             */
            icon: string;
        };
        ActivityItem: {
            /**
             * @description Activity message
             * @example startedReading
             */
            message: string;
            /**
             * @description Active time
             * @example 2021-07-01T10:00:00
             */
            time: string;
            /**
             * @description Activity importance
             * @example 1
             */
            importance: number;
        };
        Activity: {
            /**
             * @description Active date
             * @example 2021-07-01
             */
            date: string;
            /**
             * @description Active count
             * @example 10
             */
            count: number;
            /**
             * @description Active level
             * @example 10
             */
            level: number;
            /** @description List of activities */
            activities: components["schemas"]["ActivityItem"][];
        };
        UserCountOutput: {
            /** @example 1 */
            savedBooks: number;
            /** @example 1 */
            finishedBooks: number;
            /** @example 1 */
            readingBooks: number;
        };
        CatalogUserOutput: {
            /**
             * @description user id
             * @example 1
             */
            id: number;
            /**
             * Format: date-time
             * @description user created at
             * @example 2021-07-01
             */
            createdAt: string;
            /**
             * @description user email
             * @example email
             */
            email: string;
            /**
             * @description user social id
             * @example socialId
             */
            socialId: string;
            /**
             * @description user password
             * @example password
             */
            password: string;
            /**
             * @description user picture
             * @example picture
             */
            picture: string;
            /**
             * @description user full name
             * @example fullName
             */
            fullName: string;
            /**
             * @description user location
             * @example location
             */
            location: string;
            selectedGenres: components["schemas"]["ShortGenre"][];
            activities: components["schemas"]["Activity"][];
            /** @description Count of books finished, reading and saved by the user */
            _count: components["schemas"]["UserCountOutput"];
        };
        UserCatalogOutput: {
            /**
             * @description can load more
             * @example true
             */
            canLoadMore: boolean;
            /**
             * @description total pages
             * @example 1
             */
            totalPages: number;
            data: components["schemas"]["CatalogUserOutput"][];
        };
        FeaturedOutput: {
            relatedGenres: components["schemas"]["ShortGenre"][];
            recommendations: components["schemas"]["ShortBook"][];
            popularBooks: components["schemas"]["ShortBook"][];
            bestSellingBooks: components["schemas"]["ShortBook"][];
            newReleases: components["schemas"]["ShortBook"][];
        };
        FindOneGenreOutput: {
            /**
             * @description genre slug
             * @example 1
             */
            slug: string;
            /**
             * @description genre name
             * @example name
             */
            name: string;
            /**
             * @description genre icon
             * @example icon
             */
            icon: string;
            mainBooks: components["schemas"]["ShortBook"][];
        };
        Book: {
            /**
             * @description book slug
             * @example 1
             */
            slug: string;
            /**
             * @description book title
             * @example title
             */
            title: string;
            /**
             * @description book picture
             * @example picture
             */
            picture: string;
            /**
             * @description book author
             * @example author
             */
            author: string;
            /**
             * @description book description
             * @example description
             */
            description: string;
            /**
             * @description book readingTime
             * @example 100
             */
            readingTime: number;
            /**
             * @description book chapters count
             * @example 100
             */
            chapters: number;
            /**
             * @description book rating
             * @example 5
             */
            rating: number;
            /**
             * @description book visibility
             * @example true
             */
            visible: boolean;
            genres: components["schemas"]["ShortGenre"][];
        };
        BookCount: {
            /**
             * @description FinishedBy
             * @example 1
             */
            finishedBy: number;
            /**
             * @description ReadingBy
             * @example 1
             */
            readingBy: number;
            /**
             * @description SavedBy
             * @example 1
             */
            savedBy: number;
        };
        Review: {
            /**
             * @description review id
             * @example 1
             */
            id: number;
            /**
             * @description review tags
             * @example tags
             */
            tags: string[];
            /**
             * @description review text
             * @example text
             */
            text: string;
            /**
             * @description review rating
             * @example 1
             */
            rating: number;
        };
        FullBook: {
            /**
             * @description book slug
             * @example 1
             */
            slug: string;
            /**
             * @description book title
             * @example title
             */
            title: string;
            /**
             * @description book picture
             * @example picture
             */
            picture: string;
            /**
             * @description book author
             * @example author
             */
            author: string;
            /**
             * @description book description
             * @example description
             */
            description: string;
            /**
             * @description book readingTime
             * @example 100
             */
            readingTime: number;
            /**
             * @description book chapters count
             * @example 100
             */
            chapters: number;
            /**
             * @description book rating
             * @example 5
             */
            rating: number;
            /**
             * @description book visibility
             * @example true
             */
            visible: boolean;
            genres: components["schemas"]["ShortGenre"][];
            /**
             * @description book created at
             * @example 2021-07-01
             */
            createdAt: string;
            /**
             * @description book updated at
             * @example 2021-07-01
             */
            updatedAt: string;
            /**
             * @description book ebook
             * @example ebook
             */
            ebook: string;
            /** @description book count */
            _count: components["schemas"]["BookCount"];
            /** @description book activities */
            activities: components["schemas"]["Activity"][];
            /** @description book review */
            review: components["schemas"]["Review"][];
        };
        CatalogOutput: {
            /**
             * @description can load more
             * @example true
             */
            canLoadMore: boolean;
            /**
             * @description total pages
             * @example 1
             */
            totalPages: number;
            data: components["schemas"]["Book"][];
        };
        PayloadChapter: {
            id: number;
            name: string;
            text: string;
        };
        PayloadEBook: {
            id: number;
            title: string;
            chapters: components["schemas"]["PayloadChapter"][];
        };
        CreateBookDto: {
            /**
             * @description book title
             * @example title
             */
            title: string;
            /**
             * @description book picture
             * @example picture
             */
            picture: string;
            /**
             * @description book author
             * @example author
             */
            author: string;
            /**
             * @description book description
             * @example description
             */
            description: string;
            /**
             * @description book rating
             * @example 5
             */
            rating: number;
            genres: components["schemas"]["ShortGenre"][];
            ebook: components["schemas"]["PayloadEBook"][];
        };
        UpdateBookDto: {
            /**
             * @description book title
             * @example title
             */
            title?: string;
            /**
             * @description book picture
             * @example picture
             */
            picture?: string;
            /**
             * @description book author
             * @example author
             */
            author?: string;
            /**
             * @description book description
             * @example description
             */
            description?: string;
            /**
             * @description book rating
             * @example 5
             */
            rating?: number;
            /**
             * @description book visibility
             * @example true
             */
            visible?: boolean;
            genres?: components["schemas"]["ShortGenre"][];
            ebook?: components["schemas"]["PayloadEBook"][];
        };
        GoogleAuthDto: {
            /**
             * @description Social id
             * @example 1234567890
             */
            socialId: string;
        };
        AuthUser: {
            /**
             * @description User email
             * @example test@gmail.com
             */
            email: string;
            /**
             * @description User role
             * @example user
             * @enum {string}
             */
            role: "user" | "admin";
        };
        AuthOutput: {
            /**
             * @description Access token
             * @example 1234567890
             */
            accessToken: string;
            /**
             * @description Refresh token
             * @example 1234567890
             */
            refreshToken: string;
            /**
             * @description type of auth
             * @example login
             */
            type: string;
            /** @description User data */
            user: components["schemas"]["AuthUser"];
        };
        AuthDto: {
            /**
             * @description User email
             * @example test@gmail.com
             */
            email: string;
            /**
             * @description User password
             * @example password
             */
            password: string;
        };
        RefreshDto: {
            /**
             * @description Refresh token
             * @example 1234567890
             */
            refreshToken: string;
        };
        UploadOutputDto: {
            name: string;
        };
        BookTemplate: {
            /**
             * @description book template slug
             * @example 1
             */
            slug: string;
            /** @description title of the book */
            title: string;
            /** @description author of the book */
            author: string;
            /** @description description of the book */
            description: string;
            /** @description picture of the book */
            picture: string;
            /** @description rating of the book */
            rating: number;
            genres: components["schemas"]["ShortGenre"][];
        };
        BookTemplateCatalogOutput: {
            /**
             * @description can load more
             * @example true
             */
            canLoadMore: boolean;
            /**
             * @description total pages
             * @example 1
             */
            totalPages: number;
            /** @description book template */
            data: components["schemas"]["BookTemplate"][];
        };
        ParserDto: {
            /** @description url of the parser */
            url: string;
            /** @description page of the parser */
            page: number;
        };
        UnfoldOutput: {
            /** @description id of the chapter */
            id: number;
            /** @description name of the chapter */
            name: string;
            /** @description text of the chapter */
            text: string;
        };
        ReviewBookDto: {
            /**
             * @description rating
             * @example 5
             */
            rating: number;
            /** @description tags */
            tags: string[];
            /**
             * @description comment
             * @example comment
             */
            comment?: string;
        };
        UpdateRecommendationDto: {
            /** @description new genres for recommendation */
            genres: string[];
        };
        OutputChapterChild: {
            /**
             * @description chapter child name
             * @example name
             */
            name: string;
            /**
             * @description chapter child link
             * @example link
             */
            link: string;
        };
        OutputChapter: {
            /**
             * @description chapter title
             * @example title
             */
            title: string;
            /** @description chapter children */
            children: components["schemas"]["OutputChapterChild"][];
        };
        EbookOutput: {
            /**
             * @description book title
             * @example title
             */
            title: string;
            /**
             * @description book picture
             * @example picture
             */
            picture: string;
            /** @description book file */
            file: string[];
            /** @description book chapters */
            chapters: components["schemas"]["OutputChapter"][];
        };
        Chapter: {
            id: number;
            name: string;
            text: string;
            romanNumber: string;
            readingTime: number;
        };
        StoredEBook: {
            id: number;
            title: string;
            chapters: components["schemas"]["Chapter"][];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    UserController_profile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserProfileOutput"];
                };
            };
        };
    };
    UserController_library: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserLibraryOutput"];
                };
            };
        };
    };
    UserController_startReading: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UserController_finishReading: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UserController_toggleSave: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    UserController_isSaved: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
        };
    };
    UserController_catalog: {
        parameters: {
            query: {
                searchTerm: string;
                page: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserCatalogOutput"];
                };
            };
        };
    };
    UserController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    CatalogController_search: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                query: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShortBook"][];
                };
            };
        };
    };
    CatalogController_featured: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FeaturedOutput"];
                };
            };
        };
    };
    GenreController_catalog: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShortGenre"][];
                };
            };
        };
    };
    GenreController_bySlug: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FindOneGenreOutput"];
                };
            };
        };
    };
    BookController_infoBySlug: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Book"];
                };
            };
        };
    };
    BookController_adminInfoBySlug: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FullBook"];
                };
            };
        };
    };
    BookController_catalog: {
        parameters: {
            query: {
                searchTerm: string;
                page: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CatalogOutput"];
                };
            };
        };
    };
    BookController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Create book */
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateBookDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    BookController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateBookDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    BookController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_googleSign: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Sign in with google account */
        requestBody: {
            content: {
                "application/json": components["schemas"]["GoogleAuthDto"];
            };
        };
        responses: {
            /** @description Return access and refresh token */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthOutput"];
                };
            };
        };
    };
    AuthController_mailRegister: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Register new user */
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthDto"];
            };
        };
        responses: {
            /** @description Return access and refresh token */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthOutput"];
                };
            };
        };
    };
    AuthController_mailLogin: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Login user */
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthDto"];
            };
        };
        responses: {
            /** @description Return access and refresh token */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthOutput"];
                };
            };
        };
    };
    AuthController_refreshToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Refresh access token */
        requestBody: {
            content: {
                "application/json": components["schemas"]["RefreshDto"];
            };
        };
        responses: {
            /** @description Return access token */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthOutput"];
                };
            };
        };
    };
    StorageController_upload: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                folder: "ebooks" | "booksCovers";
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /** Format: binary */
                    file?: string;
                };
            };
        };
        responses: {
            /** @description File uploaded */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UploadOutputDto"];
                };
            };
        };
    };
    ParserController_catalog: {
        parameters: {
            query?: {
                /** @example The Hobbit */
                searchTerm?: string;
                /** @example 1 */
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookTemplateCatalogOutput"];
                };
            };
        };
    };
    ParserController_bySlug: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookTemplate"];
                };
            };
        };
    };
    ParserController_parse: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ParserDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ParserController_unfold: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /** Format: binary */
                    file?: string;
                };
            };
        };
        responses: {
            /** @description Unfolded book content */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UnfoldOutput"][];
                };
            };
        };
    };
    ParserController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ReviewController_review: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        /** @description Review book */
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReviewBookDto"];
            };
        };
        responses: {
            /** @description Review book */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    RecommendationController_updateRecommendation: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateRecommendationDto"];
            };
        };
        responses: {
            /** @description Recommendation updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    RecommendationController_currentRecommendation: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Recommendation genres */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShortGenre"][];
                };
            };
        };
    };
    HealthController_check: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Health check */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
            /** @description The Health Check is not successful */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example error */
                        status?: string;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       }
                         *     } */
                        info?: {
                            [key: string]: {
                                status: string;
                                [key: string]: unknown;
                            } | undefined;
                        } | null;
                        /** @example {
                         *       "redis": {
                         *         "status": "down",
                         *         "message": "Could not connect"
                         *       }
                         *     } */
                        error?: {
                            [key: string]: {
                                status: string;
                                [key: string]: unknown;
                            } | undefined;
                        } | null;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       },
                         *       "redis": {
                         *         "status": "down",
                         *         "message": "Could not connect"
                         *       }
                         *     } */
                        details?: {
                            [key: string]: {
                                status: string;
                                [key: string]: unknown;
                            } | undefined;
                        };
                    };
                };
            };
        };
    };
    EbookController_ebookBySlug: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EbookOutput"];
                };
            };
        };
    };
    EbookController_storedEbookBySlug: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StoredEBook"][];
                };
            };
        };
    };
}
