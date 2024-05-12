export declare const getAccessToken: () => Promise<string | null>;
export declare const getRefreshToken: () => Promise<string | null>;
export declare const saveTokensStorage: (data: {
    accessToken: string;
    refreshToken: string;
}) => Promise<void>;
export declare const deleteTokensStorage: () => Promise<void>;
export declare const getNewTokens: () => Promise<import("global/api-client").AuthOutput>;
