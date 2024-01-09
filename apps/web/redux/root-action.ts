import * as authActions from './auth/auth-action'
import { parserAction } from './parser/parser-slice'

export const rootAction = {
	...authActions,
	...parserAction
}
