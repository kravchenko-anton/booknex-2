import type { Linejoin } from 'react-native-svg'
import { Circle, Path, Rect } from 'react-native-svg'
import type { Linecap } from 'react-native-svg/src/lib/extract/types'

export interface SvgProperties {
	properties: {
		viewBox: string,
		fill: string,
		strokeLinecap?: Linecap;
		strokeLinejoin?: Linejoin;
		className: string
	},
	component:JSX.Element
	}


 export const book:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className: 'lucide lucide-book'
	},
	component:  (
		<Path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20" />
	)
}

export const smartphone:SvgProperties = {

	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className: 'lucide lucide-smartphone'
	},
	component: <>
			<Rect width={14} height={20} x={5} y={2} rx={2} ry={2} />
			<Path d="M12 18h.01" />
		</>
}
export const plus:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className: 'lucide lucide-plus'
	},
	component:  (
		<Path d="M12 5v14M5 12h14" />
	)
}

export const trash:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className: 'lucide lucide-trash'
	},
	component:  (
		<Path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
	)
}

export const minus:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className: 'lucide lucide-minus'
	},
	component:  (
		<Path d="M5 12h14" />
	)
}
export const x:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className: 'lucide lucide-x'
	},
	component:  (
		<Path d="M18 6L6 18M6 6l12 12" />
	)
}
export const chevronLeft:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className: 'lucide lucide-chevron-left'
	},
	component:  (
		<Path d="M15 18l-6-6 6-6" />
	)
}
export const alert:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap:'round',
		strokeLinejoin:'round',
		className:'lucide lucide-alert-triangle'
	},
	component:  (
		<Path d="M21.73 18l-8-14a2 2 0 00-3.48 0l-8 14A2 2 0 004 21h16a2 2 0 001.73-3zM12 9v4M12 17h.01" />
	)
}

export const pensil:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap:'round',
		strokeLinejoin:'round',
		className: 'lucide lucide-pencil'
	},
	component:  (
		<Path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5zM15 5l4 4" />
	)
}



export const share:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className: 'lucide lucide-share'
	},
	component: <>
		<Path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
		<Path d="M16 6L12 2 8 6" />
		<Path d="M12 2L12 15" />
	</>
}

export const user:SvgProperties = {
	properties: {
		viewBox: '0 0 24 24',
		fill: 'none',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className: 'lucide lucide-user'
	},
	component:  (
	<>  <Path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
		<Circle cx={12} cy={7} r={4} />
	</>
	)
}
