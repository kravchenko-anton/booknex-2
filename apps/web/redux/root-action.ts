import * as authActions from './auth/auth-action'
import { parserAction } from './parser/parser-slice'
import { popupAction } from './popup/popup-slice'

export const rootAction = {
	...authActions,
	...popupAction,
	...parserAction
}
