import { css } from 'styled-components'
import { Color } from '../colors'

export type TrigerComponentPaletteType = keyof Pick<typeof Color, 'gray' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'vibrant'>

export const triggerComponentPalette = {
	gray: css`
		background-color: ${Color.gray};
		color: ${Color.white};
		
		:hover {
			background-color: ${Color.foreground};
		}
	`,
	primary: css`
		background-color: ${Color.primary};
		color: ${Color.white};
		
		:hover {
			background-color: ${Color.secondary};
		}
	`,
	
	secondary: css`
		background-color: ${Color.secondary};
		color: ${Color.white};
		
		:hover {
			background-color: ${Color.primary};
		}
	`,
	
	danger: css`
		background-color: ${Color.danger};
		color: ${Color.white};
	`,
	
	success: css`
		background-color: ${Color.success};
		color: ${Color.white};
	`,
	
	warning: css`
		background-color: ${Color.warning};
		color: ${Color.white};
	`,
	
	vibrant: css`
		background-color: ${Color.vibrant};
		color: ${Color.white};
		
		:hover {
			background-color: ${Color.foreground};
		}
	`
}

export type CalmComponentPaletteType = keyof Pick<typeof Color, 'gray'
	| 'background' | 'shade' | 'foreground' | 'vibrant'
>
export const calmComponentPalette = {
	'gray': css`
		background-color: ${Color.gray};
		color: ${Color.white};
		
		:hover {
			background-color: ${Color.foreground};
		}
	`,
	'background': css`
		background-color: ${Color.background};
		color: ${Color.white};
		
		:hover {
			background-color: ${Color.foreground};
		}
	`,
	'shade': css`
		background-color: ${Color.shade};
		color: ${Color.white};
		
		:hover {
			background-color: ${Color.foreground};
		}
	`,
	
	'foreground': css`
		background-color: ${Color.foreground};
		color: ${Color.white};
		
		:hover {
			background-color: ${Color.shade};
		}
	`,
	
	'vibrant': css`
		background-color: ${Color.vibrant};
		color: ${Color.white};: "hover" {
		background-color: ${Color.foreground};
	}
	`
}
