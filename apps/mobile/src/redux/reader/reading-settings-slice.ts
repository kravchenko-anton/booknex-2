import {
  themePack,
  type ThemePackType
} from '@/screens/reading/reader-customization/helpers/theme-pack';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const fontSizeSettings = {
  min: 18,
  max: 26
};
export const ReaderFont = [
  {
    title: 'Fira Sans',
    fontFamily: 'FiraSans'
  },
  {
    title: 'Open Sans',
    fontFamily: 'OpenSans'
  },
  {
    title: 'Poppins',
    fontFamily: 'Poppins'
  },
  {
    title: 'PT Serif',
    fontFamily: 'PTSerif'
  },
  {
    title: 'Roboto',
    fontFamily: 'Roboto'
  }
];

const initialState = {
  colorScheme: themePack[0],
  font: {
    title: ReaderFont[0].title,
    fontFamily: ReaderFont[0].fontFamily
  },
  fontSize: fontSizeSettings.min,
  lineHeight: 1.3 as 1.3 | 1.5 | 1.8,
  padding: 14 as 14 | 4 | 20
};

const ReadingUiSlice = createSlice({
  name: 'reading-ui',
  initialState,
  reducers: {
    changeTheme: (state, { payload }: PayloadAction<ThemePackType['slug']>) => {
      const theme = themePack.find((value) => value.slug === payload);
      if (payload === state.colorScheme.slug || !theme) return;
      state.colorScheme = theme;
    },
    changeLineHeight: (state, { payload }: PayloadAction<1.3 | 1.5 | 1.8>) => {
      state.lineHeight = payload;
    },
    changePadding: (state, { payload }: PayloadAction<14 | 4 | 20>) => {
      state.padding = payload;
    },
    changeFontFamily: (state, { payload }: PayloadAction<(typeof ReaderFont)[number]>) => {
      state.font = payload;
    },

    changeFontSize: (state, { payload }: PayloadAction<number>) => {
      console.log(payload);
      if (payload < fontSizeSettings.min || payload > fontSizeSettings.max) return;
      state.fontSize = payload;
    }
  }
});
export const { reducer: ReadingUiReducer, actions: ReadingUiAction } = ReadingUiSlice;
