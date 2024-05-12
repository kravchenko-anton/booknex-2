import api from '@/services/api'
import { saveTokensStorage } from '@/services/store/auth-helper'
import { errorToast } from '@/utils/toast'
import type { AuthOutput } from 'global/api-client'
import { globalErrors } from 'global/errors'
import type { AuthDtoType } from 'global/validation/auth/auth.dto'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface AuthStoreStateType {
	isLoading: 'google' | 'mail-login' | false
	authType: 'register' | 'login' | null
	user: AuthOutput['user'] | null
}
export interface AuthStoreActionsType {
	mailLogin: (payload: AuthDtoType) => void
	googleLogin: (payload: { socialId: string }) => void
	logout: () => void
}

export const initialState: AuthStoreStateType = {
	isLoading: false,
	authType: null,
	user: null
}

export const useAuthStore = create<AuthStoreStateType & AuthStoreActionsType>()(
	persist(
		set => ({
			...initialState,
			mailLogin: async ({ email, password }) => {
				set({
					isLoading: 'mail-login'
				})
				api.auth
					.mailLogin({ email, password })
					.then(({ data: loginResponse }) => {
						if (!loginResponse.accessToken)
							throw new Error(globalErrors.somethingWrong)
						if (loginResponse.user.role !== 'admin')
							throw new Error(globalErrors.unknownError)
						saveTokensStorage({
							accessToken: loginResponse.accessToken,
							refreshToken: loginResponse.refreshToken
						})
						set({
							isLoading: false,
							user: loginResponse.user,
							authType: 'login'
						})
					})
					.catch(error => {
						console.error(JSON.stringify(error))

						errorToast(globalErrors.somethingWrong)
						set({
							isLoading: false,
							user: null,
							authType: null
						})
					})
			},
			googleLogin: async socialId => {
				set({
					isLoading: 'google'
				})
				api.auth
					.googleSign(socialId)
					.then(({ data: loginResponse }) => {
						if (!loginResponse.accessToken)
							throw new Error(globalErrors.somethingWrong)
						if (loginResponse.user.role !== 'admin')
							throw new Error(globalErrors.unknownError)
						saveTokensStorage({
							accessToken: loginResponse.accessToken,
							refreshToken: loginResponse.refreshToken
						})
						set({
							isLoading: false,
							user: loginResponse.user,
							authType: loginResponse.type as 'register' | 'login'
						})
					})
					.catch(error => {
						console.error(JSON.stringify(error))

						errorToast(globalErrors.somethingWrong)
						set({
							isLoading: false,
							user: null,
							authType: null
						})
					})
			},
			logout: () => {
				set({
					isLoading: false,
					user: null,
					authType: null
				})
			}
		}),
		{
			name: 'auth-store',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
