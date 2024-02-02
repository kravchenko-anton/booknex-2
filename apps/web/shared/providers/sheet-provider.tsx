import { Sheet, SheetContent } from '@/shared/ui/sheet'
import {
	createContext,
	useContext,
	useMemo,
	useState,
	type FC,
	type PropsWithChildren
} from 'react'

export interface SheetContextProperties {
	sheet: JSX.Element | null
	showSheet: (object: JSX.Element) => void
	closeSheet: () => void
}

export const SheetContext = createContext<SheetContextProperties | null>(null)

export const SheetProvider: FC<PropsWithChildren> = ({ children }) => {
	const [sheet, setSheet] = useState<JSX.Element | null>(null)

	const showSheet = (sheet: JSX.Element) => {
		setSheet(sheet)
	}

	const closeSheet = () => {
		setSheet(null)
	}

	const sheetContextValue: SheetContextProperties = useMemo(
		() => ({
			sheet,
			showSheet,
			closeSheet
		}),
		[sheet]
	)

	console.log(sheetContextValue)

	return (
		<SheetContext.Provider value={sheetContextValue}>
			<Sheet
				open={Boolean(sheet)}
				onOpenChange={open => {
					if (!open) {
						closeSheet()
					}
				}}
			>
				{children}
				<SheetContent>{sheet}</SheetContent>
			</Sheet>
		</SheetContext.Provider>
	)
}

export const useSheetContext = () => useContext(SheetContext)
