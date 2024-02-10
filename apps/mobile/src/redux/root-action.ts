import * as authActions from '@/features/auth/action/auth-action'
import { ReadingSettingsAction } from '@/features/reader/action/reading-settings-slice'

export const rootAction = {
	...authActions,
	...ReadingSettingsAction
}
