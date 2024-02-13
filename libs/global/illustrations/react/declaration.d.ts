declare module '*.svg' {
	import type { FC } from 'react'
	export const ReactComponent: FC<SVGProps<SVGSVGElement>>
	const source: FC<SVGProps<SVGSVGElement>>
	export default source
}
