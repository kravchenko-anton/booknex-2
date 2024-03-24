import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [] as NonNullable<
    {
      id: number;
      latestProgress: {
        scrollPosition: number;
        progress: number;
      };
    }[]
  >
};
const ReadingProgressSlice = createSlice({
  name: 'reading-progress',
  initialState,
  reducers: {
    updateReadingProgress: (
      state,
      { payload }: PayloadAction<{ id: number; progress: number; scrollPosition: number }>
    ) => {
      console.log('updateReadingProgress', payload);
      const book = state.books.find((value) => value.id === payload.id);
      if (book)
        book.latestProgress = {
          progress: payload.progress,
          scrollPosition: payload.scrollPosition
        };
      state.books = [
        ...state.books,
        {
          id: payload.id,
          latestProgress: {
            progress: payload.progress,
            scrollPosition: payload.scrollPosition
          }
        }
      ];
    }
  }
});
export const { reducer: ReadingProgressReducer, actions: ReadingProgressAction } =
  ReadingProgressSlice;
