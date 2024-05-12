/// <reference types="redux-persist/types/persistreducer" />
/// <reference types="redux-persist/types/types" />
/// <reference types="redux-persist" />
import { reducers } from '@/redux/root-reducer';
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: {
        isLoading: boolean;
        authType: "register" | "login" | null;
        user: import("global/api-client").AuthOutputUser | null;
    };
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: {
            isLoading: boolean;
            authType: "register" | "login" | null;
            user: import("global/api-client").AuthOutputUser | null;
        };
    } & import("redux-persist/es/persistReducer").PersistPartial, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export declare const persistor: import("redux-persist").Persistor;
export type TypeRootState = ReturnType<typeof reducers>;
