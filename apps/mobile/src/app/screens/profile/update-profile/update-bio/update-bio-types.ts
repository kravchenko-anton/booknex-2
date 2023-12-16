import type { UserType } from '@/redux/auth/auth-types'

export type UserUpdateBioTypes = Pick<UserType, 'email' | 'name'>

export interface BioSectionProperties {
	defaultEmail: string
	defaultName: string
}
