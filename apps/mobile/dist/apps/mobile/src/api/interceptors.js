import { deleteTokensStorage, getAccessToken, getNewTokens } from '@/redux/auth/auth-helper';
import { errorToast } from '@/utils/toast';
import axios from 'axios';
import { errorCatch } from 'global/helpers/catch-error';
export const instance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});
export const axiosRequestInstance = async (config) => {
    const accessToken = await getAccessToken();
    console.log('config');
    if (config.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
};
export const axiosResponseInstance = async (error) => {
    const originalRequest = error.config;
    console.log('error in intercept or', error, originalRequest);
    console.log(error.config._isRetry);
    if (error.response.status === 403)
        await deleteTokensStorage();
    if ((error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt malformed' ||
        errorCatch(error) === 'jwt must be provided') &&
        error.config &&
        !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            await getNewTokens();
            return await axios.request({
                ...originalRequest,
                headers: {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${await getAccessToken()}`
                }
            });
        }
        catch (error) {
            if (errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided' ||
                errorCatch(error) === 'jwt malformed') {
                return deleteTokensStorage();
            }
            errorToast(error);
            return Promise.reject(error);
        }
    }
    errorToast(error);
    return Promise.reject(error);
};
instance.interceptors.request.use(axiosRequestInstance);
instance.interceptors.response.use(response => response, axiosResponseInstance);
//# sourceMappingURL=interceptors.js.map