export declare const useAuth: () => {
    isLoading: boolean;
    authType: "register" | "login" | null;
    user: import("global/api-client").AuthOutputUser | null;
};
