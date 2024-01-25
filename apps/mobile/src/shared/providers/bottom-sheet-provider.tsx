import type { FC, PropsWithChildren, ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

interface BottomSheetContextProperties {
	bottomSheet: ReactNode
	showBottomSheet: (bottomSheet: ReactNode) => void
	closeBottomSheet: () => void
}

export const BottomSheetContext =
	createContext<BottomSheetContextProperties | null>(null)
export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
	const [bottomSheet, setBottomSheet] = useState<ReactNode>(null)

	const showBottomSheet = (bottomSheet: ReactNode) => {
		setBottomSheet(bottomSheet)
	}

	const closeBottomSheet = () => {
		setBottomSheet(null)
	}

	const bottomSheetContextValue: BottomSheetContextProperties = useMemo(
		() => ({
			bottomSheet,
			showBottomSheet,
			closeBottomSheet
		}),
		[bottomSheet]
	)
	return (
		<BottomSheetContext.Provider value={bottomSheetContextValue}>
			{children}
			{bottomSheet}
		</BottomSheetContext.Provider>
	)
}

export const useBottomSheetContext = () => useContext(BottomSheetContext)
