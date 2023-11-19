import { alertReducer } from '@/redux/alert/alert-slice'
import { authReducer } from '@/redux/auth/auth-slice'
import { BottomSheetReducer } from '@/redux/bottom-sheet-slice/bottom-sheet-slice'
import { EpubReaderReducer } from '@/redux/epub-reader-slice/epub-reader-slice'
import { ReadingSettingsReducer } from '@/redux/reading-settings/reading-settings-slice'
import { readingUiReducer } from '@/redux/reading-settings/reading-ui-slice'
import { combineReducers } from '@reduxjs/toolkit'

export const reducers = combineReducers({
	auth: authReducer,
	alert: alertReducer,
	reader: EpubReaderReducer,
	readingUi: readingUiReducer,
	readingSettings: ReadingSettingsReducer,
	bottomSheet: BottomSheetReducer
})
