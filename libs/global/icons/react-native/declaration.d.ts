declare module '*.svg' {
	import type { FC } from 'react'
	const content: FC<SVGProps<SVGElement>>
	export default content
}
