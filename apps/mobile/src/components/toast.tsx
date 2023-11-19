import { fontSettings } from '@/components/ui/title/title-settings'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { Text } from 'react-native'
import RnToast, { BaseToast } from 'react-native-toast-message'

const options = (color: string) => ({
	style: {
		backgroundColor: Color.pale,
		alignItems: 'center' as const,
		borderRadius: 8,
		borderLeftColor: color,
		borderColor: color,
		borderWidth: 3,
		borderLeftWidth: 3
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
			position={'top'}
			config={{
				success: properties => (
					<BaseToast
						renderTrailingIcon={() => (
							<Text className='items-center justify-center  pr-3 text-3xl'>
								🎉
							</Text>
						)}
						{...properties}
						{...options('#3F612D')}
					/>
				),
				info: properties => (
					<BaseToast
						renderTrailingIcon={() => (
							<Text className='items-center justify-center  pr-3 text-3xl'>
								⚠️
							</Text>
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
