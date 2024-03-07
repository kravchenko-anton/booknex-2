import {
	themePack,
	type ThemePackType
} from '@/screens/reading/ui/reading/theme-pack'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export enum ReaderFontsEnum {
	Courier = 'Courier New, Courier, monospace',
	Arial = 'Arial, Helvetica, sans-serif',
	TimesRoman = 'Times New Roman, Times, serif'
}

export const fontSizeSettings = {
	min: 18,
	max: 26
}
export const ReaderFont = [
	{
		title: 'Courier',
		fontFamily: ReaderFontsEnum.Courier
	},
	{
		title: 'Arial',
		fontFamily: ReaderFontsEnum.Arial
	},
	{
		title: 'Time Roman',
		fontFamily: ReaderFontsEnum.TimesRoman
	}
]

const initialState = {
	colorScheme: themePack[0] as ThemePackType,
	font: {
		title: 'Courier New',
		fontFamily: ReaderFontsEnum.Courier
	},
	fontSize: fontSizeSettings.min,
	lineHeight: 1.3 as 1.3 | 1.5 | 1.8,
	padding: 14 as 14 | 4 | 20
}

const ReadingUiSlice = createSlice({
	name: 'reading-ui',
	initialState,
	reducers: {
		changeTheme: (state, { payload }: PayloadAction<ThemePackType['slug']>) => {
			const theme = themePack.find(value => value.slug === payload)
			if (payload === state.colorScheme.slug || !theme) return
			state.colorScheme = theme
		},
		changeLineHeight: (state, { payload }: PayloadAction<1.3 | 1.5 | 1.8>) => {
			state.lineHeight = payload
		},
		changePadding: (state, { payload }: PayloadAction<14 | 4 | 20>) => {
			state.padding = payload
		},
		changeFontFamily: (
			state,
			{ payload }: PayloadAction<(typeof ReaderFont)[number]>
		) => {
			state.font = payload
		},

		changeFontSize: (state, { payload }: PayloadAction<number>) => {
			console.log(payload)
			if (payload < fontSizeSettings.min || payload > fontSizeSettings.max)
				return
			state.fontSize = payload
		}
	}
})
export const { reducer: ReadingUiReducer, actions: ReadingUiAction } =
	ReadingUiSlice
