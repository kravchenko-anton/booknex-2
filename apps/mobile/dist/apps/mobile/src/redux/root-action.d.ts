export declare const rootAction: {
    googleLogin: import("@reduxjs/toolkit").AsyncThunk<import("global/api-client").AuthOutput, {
        socialId: string;
    }, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
    mailRegister: import("@reduxjs/toolkit").AsyncThunk<import("global/api-client").AuthOutput, import("global/api-client").AuthDto, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
    mailLogin: import("@reduxjs/toolkit").AsyncThunk<import("global/api-client").AuthOutput, import("global/api-client").AuthDto, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
    logout: import("@reduxjs/toolkit").AsyncThunk<{}, void, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
};
