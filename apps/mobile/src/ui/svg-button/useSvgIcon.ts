import { storage } from '@/App'
import { getFileUrl } from 'global/api-config'
import { useLayoutEffect, useState } from 'react'

export const useSvgIcon = (svgUri: string, emoji: string) => {
	const [svgContent, setSvgContent] = useState<{
		type: 'emoji' | 'svg'
		content: string
	} | null>(null)
	useLayoutEffect(() => {
		const getSvgFromStorage = async () => {
			const svg = storage.getString('svg-button' + svgUri)
			if (svg) {
				setSvgContent({
					type: 'svg',
					content: svg
				})
			}
			if (!svg) {
				const fetchedSvg = await fetch(getFileUrl(svgUri))
					.then(response => response.text())
					.catch(() =>
						setSvgContent({
							type: 'emoji',
							content: emoji
						})
					)
				if (!fetchedSvg) return
				storage.set('svg-button' + svgUri, fetchedSvg)
				setSvgContent({
					type: 'svg',
					content: fetchedSvg
				})
			}
		}
		getSvgFromStorage()
	}, [svgUri])

	return svgContent
}
