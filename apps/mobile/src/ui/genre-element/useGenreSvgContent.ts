import { storage } from '@/App'
import { getFileUrl } from 'global/api-config'
import { useLayoutEffect, useState } from 'react'

export const useGenreSvgContent = (svgUri: string) => {
	const [svgContent, setSvgContent] = useState<string | null>(null)
	useLayoutEffect(() => {
		const getGenreFromStorage = async () => {
			const svg = storage.getString('svg-genre' + svgUri)
			if (svg) {
				setSvgContent(svg)
			}
			if (!svg) {
				const fetchedSvg = await fetch(getFileUrl(svgUri))
					.then(response => response.text())
					.catch(() => null)
				if (!fetchedSvg) return
				storage.set('svg-genre' + svgUri, fetchedSvg)
				setSvgContent(fetchedSvg)
			}
		}
		getGenreFromStorage()
	}, [svgUri])

	return svgContent
}
