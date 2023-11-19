import type { UserType } from '@/services/types/user-services-types'

export type UserUpdateBioTypes = Pick<UserType, 'email' | 'name'>

export interface BioSectionProperties {
	defaultEmail: string,
	defaultName: string
}
