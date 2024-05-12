import type { AuthDto, AuthOutput } from 'global/api-client';
export declare const googleLogin: import("@reduxjs/toolkit").AsyncThunk<AuthOutput, {
    socialId: string;
}, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
export declare const mailRegister: import("@reduxjs/toolkit").AsyncThunk<AuthOutput, AuthDto, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
export declare const mailLogin: import("@reduxjs/toolkit").AsyncThunk<AuthOutput, AuthDto, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
export declare const logout: import("@reduxjs/toolkit").AsyncThunk<{}, void, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
