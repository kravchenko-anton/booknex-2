import type { TypeRootStackParameterList } from '@/navigation/navigation-types'
import type { IconProperties } from '@/types/global'

export interface IMenuItem extends IconProperties {
	path: keyof TypeRootStackParameterList
}

export type TypeNavigate = (
	screenName: keyof TypeRootStackParameterList
) => void
