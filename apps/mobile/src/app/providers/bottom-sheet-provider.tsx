import Sheet from '@/components/bottom-sheet/bottom-sheet'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { createContext, useState } from 'react'

interface BottomSheetContextProperties {
	bottomSheet: {
		component: ReactNode
		snapPoints: (string | number)[]
		backgroundColor?: string
		indicatorColor?: string
	} | null
	showBottomSheet: (bottomSheet: {
		component: ReactNode
		snapPoints: number[]
		backgroundColor?: string
		indicatorColor?: string
	}) => void
	closeBottomSheet: () => void
}

export const BottomSheetContext = createContext<
	BottomSheetContextProperties | undefined
>(undefined)
export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
	const [bottomSheet, setBottomSheet] = useState<{
		component: ReactNode
		snapPoints: (string | number)[]
		backgroundColor?: string
		indicatorColor?: string
	}>(null)

	const showBottomSheet = (bottomSheet: {
		component: ReactNode
		snapPoints: (string | number)[]
		backgroundColor?: string
		indicatorColor?: string
	}) => {
		setBottomSheet({
			...bottomSheet
		})
	}

	const closeBottomSheet = () => {
		setBottomSheet(null)
	}

	const bottomSheetContextValue: BottomSheetContextProperties = {
		bottomSheet,
		showBottomSheet,
		closeBottomSheet
	}
	return (
		<BottomSheetContext.Provider value={bottomSheetContextValue}>
			{children}
			<Sheet
				onClose={() => closeBottomSheet()}
				snapPoints={bottomSheet?.snapPoints}
				backgroundColor={bottomSheet?.backgroundColor}
				indicatorColor={bottomSheet?.indicatorColor}
			>
				{bottomSheet?.component}
			</Sheet>
		</BottomSheetContext.Provider>
	)
}
