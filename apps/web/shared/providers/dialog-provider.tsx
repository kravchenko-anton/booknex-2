import { Dialog, DialogContent } from '@/shared/ui/dialog'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

export interface DialogContextProperties {
	dialog: JSX.Element | null
	showDialog: (object: JSX.Element) => void
	closeDialog: () => void
}

export const DialogContext = createContext<DialogContextProperties | null>(null)

export const DialogProvider: FC<PropsWithChildren> = ({ children }) => {
	const [dialog, setDialog] = useState<JSX.Element | null>(null)

	const showDialog = (dialog: JSX.Element) => {
		setDialog(dialog)
	}

	const closeDialog = () => {
		setDialog(null)
	}

	const dialogContextValue: DialogContextProperties = useMemo(
		() => ({
			dialog,
			showDialog,
			closeDialog
		}),
		[dialog]
	)
	console.log(dialogContextValue)
	return (
		<DialogContext.Provider value={dialogContextValue}>
			<Dialog
				onOpenChange={open => {
					if (!open) closeDialog()
				}}
				open={!!dialog}
			>
				{children}
				<DialogContent>{dialog}</DialogContent>
			</Dialog>
		</DialogContext.Provider>
	)
}

export const useDialogContext = () => useContext(DialogContext)
