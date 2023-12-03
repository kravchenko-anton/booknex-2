declare module '*.svg' {
	import React = require('react')
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
	const source: React.FC<React.SVGProps<SVGSVGElement>>
	export default source
}
