import { Clock } from 'icons'
import type { FC } from 'react'
import { Text } from 'react-native'
import RnToast, { BaseToast } from 'react-native-toast-message'
import { Color } from 'ui/colors'
import { fontSettings } from '../../../../../libs/ui/react-native/title/settings'

const options = (color: string) => ({
	style: {
		backgroundColor: Color.shade,
		alignItems: 'center' as 'center',
		borderRadius: 12,
		borderLeftColor: color,
		borderColor: Color.shade,
		borderWidth: 0,
		borderLeftWidth: 0
	},
	text1Style: {
		color: color,
		fontSize: 18,
		marginLeft: -12,
		fontFamily: fontSettings.bold
	},
	text2Style: {
		fontSize: 12,
		marginLeft: -12,
		color: Color.gray,
		fontFamily: fontSettings.light
	}
})

const Toast: FC = () => (
	<RnToast
		autoHide={true}
		visibilityTime={3000}
		position='top'
		config={{
			success: properties => (
				<BaseToast
					renderTrailingIcon={() => (
						<Clock className='items-center justify-center  pr-3 text-3xl' />
					)}
					{...properties}
					{...options('#3F612D')}
				/>
			),
			info: properties => (
				<BaseToast
					renderTrailingIcon={() => (
						<Clock
							color={Color.white}
							width={30}
							height={30}
							className='mr-3'
						/>
					)}
					{...properties}
					{...options('#F9C74F')}
				/>
			),
			error: properties => (
				<BaseToast
					renderTrailingIcon={() => (
						<Text className='items-center justify-center  pr-3 text-3xl'>
							🚨
						</Text>
					)}
					{...properties}
					{...options('#D7263D')}
				/>
			)
		}}
	/>
)

export default Toast
