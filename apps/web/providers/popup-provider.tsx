import Modal from '@/components/modal/modal'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

export interface PopupContextProperties {
	popup: JSX.Element | null
	showPopup: (object: JSX.Element) => void
	closePopup: () => void
}

export const PopupContext = createContext<PopupContextProperties | null>(null)

export const PopupProvider: FC<PropsWithChildren> = ({ children }) => {
	const [popup, setPopup] = useState<JSX.Element | null>(null)

	const showPopup = (popup: JSX.Element) => {
		setPopup(popup)
	}

	const closePopup = () => {
		setPopup(null)
	}

	const popupContextValue: PopupContextProperties = useMemo(
		() => ({
			popup,
			showPopup,
			closePopup
		}),
		[popup]
	)

	return (
		<PopupContext.Provider value={popupContextValue}>
			{children}
			<Modal
				closePopup={popupContextValue.closePopup}
				popup={popupContextValue.popup}
			/>
		</PopupContext.Provider>
	)
}

export const usePopupContext = () => useContext(PopupContext)
