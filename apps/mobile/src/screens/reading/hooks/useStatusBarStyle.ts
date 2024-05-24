import { useTypedNavigation } from '@/hooks'
import type { ThemePackType } from '@/screens/reading/reader-customization/theme-pack'
import { useEffect } from 'react'

interface StatusBarStyleProperties {
	colorScheme: ThemePackType
	isVisible: boolean
}
export const useStatusBarStyle = ({
	colorScheme,
	isVisible
}: StatusBarStyleProperties) => {
	const { setOptions } = useTypedNavigation()
	useEffect(() => {
		setOptions({
			statusBarStyle: colorScheme.statusBar,
			navigationBarColor: colorScheme.colorPalette.background.darker,
			navigationBarHidden: !isVisible,
			statusBarTranslucent: true,
			statusBarHidden: !isVisible,
			statusBarColor: colorScheme.colorPalette.background.darker
		})
	}, [colorScheme, setOptions, isVisible])
}
