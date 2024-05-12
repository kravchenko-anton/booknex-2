import { InternalAxiosRequestConfig } from 'axios';
export declare const instance: import("axios").AxiosInstance;
export declare const axiosRequestInstance: (config: InternalAxiosRequestConfig<any>) => Promise<InternalAxiosRequestConfig<any>>;
export declare const axiosResponseInstance: (error: any) => Promise<void | import("axios").AxiosResponse<any, any>>;
