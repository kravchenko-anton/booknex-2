import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFileUrl } from 'global/api-config'
import { useLayoutEffect, useState } from 'react'

export const useGenreSvgContent = (svgUri: string) => {
	const [svgContent, setSvgContent] = useState<string | null>(null)
	useLayoutEffect(() => {
		const getFromAsyncStorageSvgGenre = async () => {
			const svg = await AsyncStorage.getItem('svgGenre' + svgUri)
			if (svg) {
				console.log('svg from async storage ' + svgUri)
				setSvgContent(svg)
				return
			} else {
				const svg = await fetch(getFileUrl(svgUri)).then(response =>
					response.text()
				)
				if (!svg) return
				await AsyncStorage.setItem('svgGenre' + svgUri, svg)
				console.log('svg from fetch ' + svgUri)
				return svg
			}
		}
		getFromAsyncStorageSvgGenre()
	}, [svgUri])

	return svgContent
}
