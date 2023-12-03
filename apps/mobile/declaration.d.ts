declare module '*.png'
declare module '*.jpeg'
declare module '*.jpg'
declare module '*.svg' {
	import type { FC } from 'react'
	const content: FC<React.SVGProps>
	export default content
}
