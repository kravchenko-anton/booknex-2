import type { AuthFieldsType } from '@/redux/auth/auth-types'

export interface EditPasswordTypes extends Pick<AuthFieldsType, 'password'> {
	oldPassword: string
}
