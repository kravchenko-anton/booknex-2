import { useTypedNavigation } from '@/hooks'
import type { ThemePackType } from '@/screens/reading/utils/theme-pack'
import { useEffect } from 'react'

interface StatusBarStyleProperties {
	colorScheme: ThemePackType
	readerUiVisible: boolean
}
export const useStatusBarStyle = ({
	colorScheme,
	readerUiVisible
}: StatusBarStyleProperties) => {
	const { setOptions } = useTypedNavigation()
	useEffect(() => {
		setOptions({
			statusBarStyle: colorScheme.statusBar,
			navigationBarColor: colorScheme.colorPalette.background.darker,
			navigationBarHidden: true,
			statusBarTranslucent: true,
			statusBarHidden: !readerUiVisible,
			statusBarColor: colorScheme.colorPalette.background.darker
		})
	}, [colorScheme, setOptions, readerUiVisible])
}
