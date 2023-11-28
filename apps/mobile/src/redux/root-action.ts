import { alertAction } from '@/redux/alert/alert-slice'
import { BottomSheetAction } from '@/redux/bottom-sheet-slice/bottom-sheet-slice'
import { EpubReaderAction } from '@/redux/epub-reader-slice/epub-reader-slice'
import { ReadingSettingsAction } from '@/redux/reading-settings/reading-settings-slice'
import { readingUiAction } from '@/redux/reading-settings/reading-ui-slice'
import * as authActions from '../redux/auth/auth-action'

export const rootAction = {
	...authActions,
	...alertAction,
	...readingUiAction,
	...EpubReaderAction,
	...ReadingSettingsAction,
	...BottomSheetAction
}
