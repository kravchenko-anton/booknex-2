import { errorToast } from '@/utils/toast';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from 'redux';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log('rtkQueryErrorLogger', action.error);
    errorToast(
      'data' in action.error
        ? (action.error.data as { message: string }).message
        : action.error.message
    );
  }

  return next(action);
};
