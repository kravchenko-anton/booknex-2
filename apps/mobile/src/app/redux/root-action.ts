import { ReadingSettingsAction } from '@/redux/reading-settings/reading-settings-slice'
import * as authActions from '../redux/auth/auth-action'

export const rootAction = {
	...authActions,
	...ReadingSettingsAction
}
