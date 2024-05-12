import { errorToast } from '@/utils/toast';
import { isRejectedWithValue } from '@reduxjs/toolkit';
export const rtkQueryErrorLogger = () => next => action => {
    if (isRejectedWithValue(action)) {
        console.error('rtkQueryErrorLogger', action.error);
        errorToast('data' in action.error
            ? action.error.data.message
            : action.error.message);
    }
    return next(action);
};
//# sourceMappingURL=error.middleware.js.map