import { fontSettings } from '@/components/ui/title/settings'
import { Color } from 'global/colors'
import { OkHandEmoji, ThumbDownEmoji } from 'icons'
import type { FC } from 'react'
import RnToast, { BaseToast } from 'react-native-toast-message'

const options = () => ({
	style: {
		backgroundColor: Color.foreground,
		alignItems: 'center' as 'center',
		borderRadius: 12,
		height: 45,
		borderColor: Color.muted,
		borderWidth: 1.5,
		borderLeftWidth: 1.5,
		shadowColor: Color.transparent
	},
	text1Style: {
		color: Color.white,
		fontSize: 17,
		marginLeft: -18,
		fontFamily: fontSettings.light
	}
})

const Toast: FC = () => (
	<RnToast
		config={{
			success: properties => (
				<BaseToast
					renderLeadingIcon={() => (
						<OkHandEmoji className='ml-2' width={30} height={30} />
					)}
					{...properties}
					{...options()}
				/>
			),
			error: properties => (
				<BaseToast
					renderLeadingIcon={() => (
						<ThumbDownEmoji className='ml-2' width={30} height={30} />
					)}
					{...properties}
					{...options()}
				/>
			)
		}}
	/>
)

export default Toast
