import type { AlertContextProperties } from '@/providers/alert-provider'
import type { FC } from 'react'
import { Modal, View } from 'react-native'
import { Color } from 'ui/colors'
import { Button, Title } from 'ui/components'

const Alert: FC<Pick<AlertContextProperties, 'alert' | 'closeAlert'>> = ({
	closeAlert = () => {},
	alert = null
}) => {
	if (!alert) return null
	return (
		<Modal
			animationType='fade'
			presentationStyle='overFullScreen'
			transparent={true}
			statusBarTranslucent={true}
			visible={!!alert}
			onRequestClose={closeAlert}
		>
			<View
				onTouchStart={closeAlert}
				style={{
					backgroundColor: 'rgba(18, 18, 18, 0.65)'
				}}
				className='flex-1 items-center  justify-center '
			>
				<View
					onTouchStart={event => event.stopPropagation()}
					className='bg-foreground z-50 w-10/12 items-center rounded-2xl p-4'
				>
					<alert.icon
						className='mt-2'
						width={40}
						height={40}
						color={Color.gray}
					/>
					<Title
						size={18}
						color={Color.gray}
						className='mb-1 mt-2 px-2'
						weight='semiBold'
						numberOfLines={2}
						center
					>
						{alert.description}
					</Title>

					<Button
						onPress={() => {
							alert.onAccept()
							closeAlert()
						}}
						className='mt-4 w-full'
						variant={alert.type}
						size='md'
					>
						{alert.acceptText}
					</Button>
					<Button
						onPress={closeAlert}
						className='mt-2 w-full'
						variant='foreground'
						size='md'
					>
						Cancel
					</Button>
				</View>
			</View>
		</Modal>
	)
}

export default Alert
