import {
	SpaceGrotesk_300Light,
	SpaceGrotesk_400Regular,
	SpaceGrotesk_500Medium,
	SpaceGrotesk_600SemiBold,
	SpaceGrotesk_700Bold,
	useFonts
} from '@expo-google-fonts/space-grotesk'

export const FontProvider = () => {
	const [isFontsLoaded] = useFonts({
		SpaceGrotesk_300Light,
		SpaceGrotesk_400Regular,
		SpaceGrotesk_500Medium,
		SpaceGrotesk_600SemiBold,
		SpaceGrotesk_700Bold
	})

	return isFontsLoaded
}
