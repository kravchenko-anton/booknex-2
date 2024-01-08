import Alert from '@/components/alert/alert'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import type { SvgProps } from 'react-native-svg'

export interface AlertProperties {
	icon: FC<SvgProps>
	acceptText: string
	type: 'primary' | 'secondary' | 'danger'
	description: string
	onAccept: () => void
}
export interface AlertContextProperties {
	alert: AlertProperties | null
	showAlert: (object: AlertProperties) => void
	closeAlert: () => void
}

export const AlertContext = createContext<AlertContextProperties | undefined>(
	undefined
)

export const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
	const [alert, setAlert] = useState<AlertProperties | null>(null)

	const showAlert = (alert: AlertProperties) => {
		setAlert(alert)
	}

	const closeAlert = () => {
		setAlert(null)
	}

	const alertContextValue: AlertContextProperties = useMemo(
		() => ({
			alert,
			showAlert,
			closeAlert
		}),
		[alert]
	)

	return (
		<AlertContext.Provider value={alertContextValue}>
			{children}
			<Alert closeAlert={closeAlert} alert={alert} />
		</AlertContext.Provider>
	)
}

export const useAlertContext = () => useContext(AlertContext)
