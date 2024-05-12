export declare const reducers: import("redux").Reducer<{
    auth: {
        isLoading: boolean;
        authType: "register" | "login" | null;
        user: import("global/api-client").AuthOutputUser | null;
    };
}, import("redux").UnknownAction, Partial<{
    auth: {
        isLoading: boolean;
        authType: "register" | "login" | null;
        user: import("global/api-client").AuthOutputUser | null;
    } | undefined;
}>>;
