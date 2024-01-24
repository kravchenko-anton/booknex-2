import * as authActions from '@/features/auth/action/auth-action'
import { ReadingSettingsAction } from '@/shared/redux/reading-settings/reading-settings-slice'

export const rootAction = {
	...authActions,
	...ReadingSettingsAction
}
