import Alert from '@/components/alert/alert'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useState } from 'react'
import type { SvgProps } from 'react-native-svg'

export interface AlertProperties {
	icon: FC<SvgProps>
	acceptText: string
	type: 'primary' | 'secondary' | 'danger'
	description: string
	onAccept: () => void
}
interface AlertContextProperties {
	alert: AlertProperties | null
	showAlert: (object: AlertProperties) => void
	hideAlert: () => void
}

export const AlertContext = createContext<AlertContextProperties | undefined>(
	undefined
)

export const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
	const [alert, setAlert] = useState<AlertProperties | null>(null)

	const showAlert = (alert: AlertProperties) => {
		setAlert(alert)
	}

	const hideAlert = () => {
		setAlert(null)
	}

	const alertContextValue: AlertContextProperties = {
		alert,
		showAlert,
		hideAlert
	}

	console.log('Render')

	return (
		<AlertContext.Provider value={alertContextValue}>
			{children}
			<Alert closeAlert={hideAlert} alert={alert} />
		</AlertContext.Provider>
	)
}
