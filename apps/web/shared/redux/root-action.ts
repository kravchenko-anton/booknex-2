import * as authActions from '../../features/auth/action/auth-action'
import { parserAction } from './parser/parser-slice'

export const rootAction = {
	...authActions,
	...parserAction
}
