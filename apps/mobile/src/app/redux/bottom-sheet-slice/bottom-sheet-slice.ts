import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { BottomSheetList } from '../../components/ui/bottom-sheet/bottom-sheet-list/bottom-sheet-list'
import type { BottomSheetListEnum, SheetType } from '../../components/ui/bottom-sheet/bottom-sheet-list/bottom-sheet-list-types.ts'
// TODO: сделать слайс
const initialState = {
	bottomSheet: null as null | SheetType
}

const BottomSheetSlice = createSlice({
	name: 'bottom-sheet',
	initialState,
	reducers: {
		openBottomSheet(state, action: PayloadAction<BottomSheetListEnum>) {
			state.bottomSheet =
				BottomSheetList.find(sheet => sheet.name === action.payload) || null
		},
		closeBottomSheet(state) {
			state.bottomSheet = null
		}
	}
})

export const { reducer: BottomSheetReducer, actions: BottomSheetAction } =
	BottomSheetSlice
