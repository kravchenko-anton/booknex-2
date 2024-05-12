export declare const authSlice: import("@reduxjs/toolkit").Slice<{
    isLoading: boolean;
    authType: "register" | "login" | null;
    user: import("global/api-client").AuthOutputUser | null;
}, {}, "auth", "auth", import("@reduxjs/toolkit").SliceSelectors<{
    isLoading: boolean;
    authType: "register" | "login" | null;
    user: import("global/api-client").AuthOutputUser | null;
}>>;
export declare const authReducer: import("redux").Reducer<{
    isLoading: boolean;
    authType: "register" | "login" | null;
    user: import("global/api-client").AuthOutputUser | null;
}>;
