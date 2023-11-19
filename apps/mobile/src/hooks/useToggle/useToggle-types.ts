import type { UserLibraryFieldsType } from '@/services/types/user-services-types'

export interface UseToggleProperties {
	id: number,
	type: keyof UserLibraryFieldsType
}
