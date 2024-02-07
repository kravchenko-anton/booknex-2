import * as authActions from '@/redux/auth/auth-action'
import { ReadingSettingsAction } from '@/redux/reader/reading-settings-slice'

export const rootAction = {
	...authActions,
	...ReadingSettingsAction
}
