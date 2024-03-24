import api from '@/services/index';
import { errorToast, successToast } from '@/utils/toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthDto, AuthOutput } from 'global/api-client';
import { GlobalErrorsEnum } from 'global/errors';

import { deleteTokensStorage, saveTokensStorage } from './auth-helper';

export const mailLogin = createAsyncThunk<AuthOutput, AuthDto>(
  'auth/mailLogin',
  async ({ email, password }, thunkAPI) => {
    try {
      const { data: loginResponse } = await api.auth.mailLogin({
        email,
        password
      });
      console.log(loginResponse);
      if (loginResponse.user.role !== 'admin') return thunkAPI.rejectWithValue('You are not admin');
      saveTokensStorage({
        accessToken: loginResponse.accessToken,
        refreshToken: loginResponse.refreshToken
      });

      successToast('Login successfully');
      return loginResponse;
    } catch (error) {
      errorToast(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const googleLogin = createAsyncThunk<
  AuthOutput,
  {
    socialId: string;
  }
>('auth/googleLogin', async ({ socialId }, thunkAPI) => {
  try {
    const { data: loginResponse } = await api.auth.googleSign({ socialId });
    console.log(loginResponse);

    if (loginResponse.user.role !== 'admin')
      return thunkAPI.rejectWithValue(GlobalErrorsEnum.somethingWrong);
    saveTokensStorage({
      accessToken: loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken
    });

    successToast('Login successfully');
    return loginResponse;
  } catch (error) {
    errorToast(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('auth/logout', () => {
  try {
    deleteTokensStorage();
  } catch (error) {
    errorToast(error);
  }
  return {};
});
