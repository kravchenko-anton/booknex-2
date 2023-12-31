import type { ThemePackType } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
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
	colorScheme: themePack[1],
	font: {
		title: 'Courier New',
		fontFamily: ReaderFontsEnum.Courier
	},
	fontSize: fontSizeSettings.min,
	lineHeight: 1.3 as 1.3 | 1.5 | 1.8,
	padding: 14 as 14 | 8 | 20,
	books: [] as
		| null
		| {
				title: string
				lastProgress: {
					location: number
					progress: number
				}
				highlights: {
					text: string
				}[]
		  }[]
}

const ReadingSettingsSlice = createSlice({
	name: 'readingSettings',
	initialState,
	reducers: {
		changeTheme: (state, { payload }: PayloadAction<ThemePackType['slug']>) => {
			const theme = themePack.find(value => value.slug === payload)
			if (payload === state.colorScheme.slug || !theme) return
			state.colorScheme = theme
			console.log('changeTheme', payload)
		},
		changeLineHeight: (state, { payload }: PayloadAction<1.3 | 1.5 | 1.8>) => {
			state.lineHeight = payload
		},
		changePadding: (state, { payload }: PayloadAction<14 | 8 | 20>) => {
			state.padding = payload
		},
		changeFontFamily: (
			state,
			{ payload }: PayloadAction<(typeof ReaderFont)[number]>
		) => {
			state.font = payload
			console.log('changeFontFamily', payload)
		},

		changeFontSize: (state, { payload }: PayloadAction<number>) => {
			console.log(payload)
			if (payload < fontSizeSettings.min || payload > fontSizeSettings.max)
				return
			state.fontSize = payload
			console.log('changeFontSize', payload)
		},

		updateReadingProgress: (
			state,
			{
				payload
			}: PayloadAction<{ title: string; progress: number; location: number }>
		) => {
			const book = state.books?.find(value => value.title === payload.title)
			if (book) {
				book.lastProgress = {
					progress: payload.progress,
					location: payload.location
				}
			} else {
				state.books = [
					...(state.books ?? []),
					{
						title: payload.title,
						lastProgress: {
							progress: payload.progress,
							location: payload.location
						},
						highlights: []
					}
				]
			}
		}
	}
})
export const {
	reducer: ReadingSettingsReducer,
	actions: ReadingSettingsAction
} = ReadingSettingsSlice
