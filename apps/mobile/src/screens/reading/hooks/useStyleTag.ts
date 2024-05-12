import { getStyleTag } from '@/screens/reading/scripts/styles-injection'
import type { CustomizationStoreType } from '@/screens/reading/store/customization-store'
import { useState } from 'react'

export const useStyleTag = (
	properties: CustomizationStoreType,
	scrollPosition: number
) => {
	const { lineHeight, fontSize, font, colorScheme, padding } = properties

	const styleTag = getStyleTag({
		colorPalette: colorScheme.colorPalette,
		fontFamily: font.fontFamily,
		fontSize: fontSize,
		lineHeight,
		padding
	})

	// eslint-disable-next-line
	const [defaultProperties] = useState({
		scrollPosition,
		theme: styleTag
	})

	return { styleTag, defaultProperties }
}
