import * as authActions from '@/redux/auth/auth-action';
import { ReadingProgressAction } from '@/redux/reader/readering-progress-slice';
import { ReadingUiAction } from '@/redux/reader/reading-settings-slice';

export const rootAction = {
  ...authActions,
  ...ReadingUiAction,
  ...ReadingProgressAction
};
