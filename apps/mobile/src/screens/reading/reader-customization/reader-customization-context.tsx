import { useAction, useTypedSelector } from '@/hooks'
import type { ThemePackType } from '@/screens/reading/reader-customization/helpers/theme-pack'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import {
	createContext,
	useContext,
	type FC,
	type PropsWithChildren
} from 'react'

export const CustomizationContext = createContext(
	null as unknown as {
		changePadding: ActionCreatorWithPayload<
			14 | 4 | 20,
			'reading-ui/changePadding'
		>
		padding: number
		changeLineHeight: ActionCreatorWithPayload<
			1.3 | 1.5 | 1.8,
			'reading-ui/changeLineHeight'
		>
		lineHeight: number
		changeFontFamily: ActionCreatorWithPayload<
			{ title: string; fontFamily: string },
			'reading-ui/changeFontFamily'
		>
		font: {
			title: string
			fontFamily: string
		}
		changeFontSize: (fontSize: number) => void
		fontSize: number
		colorScheme: ThemePackType
		changeTheme: (slug: string) => void
	}
)

export const ReaderCustomizationProvider: FC<PropsWithChildren> = ({
	children
}) => {
	const {
		changePadding,
		changeTheme,
		changeLineHeight,
		changeFontFamily,
		changeFontSize
	} = useAction()
	const { padding, lineHeight, font, fontSize, colorScheme } = useTypedSelector(
		state => state.readingUi
	)
	const value = {
		changePadding,
		padding,
		changeTheme,
		changeLineHeight,
		lineHeight,
		changeFontFamily,
		font,
		changeFontSize,
		fontSize,
		colorScheme
	}
	console.log('context render' + Math.random())
	return (
		<CustomizationContext.Provider value={value}>
			{children}
		</CustomizationContext.Provider>
	)
}

// Custom hook to use the context
export const useReaderCustomization = () => {
	const context = useContext(CustomizationContext)
	if (!context) {
		throw new Error(
			'useReaderCustomization must be used within a ReaderCustomization'
		)
	}
	return context
}
