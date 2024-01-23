import { Button, Title } from '@/components/ui'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { Color } from 'global/colors'
import { Modal, View } from 'react-native'

const Alert = () => {
	const { goBack } = useTypedNavigation()
	const { params } = useTypedRoute<'Alert'>()
	if (!params) return null
	return (
		<Modal
			animationType='fade'
			presentationStyle='overFullScreen'
			transparent={true}
			statusBarTranslucent={true}
			visible={true}
			onRequestClose={goBack}
		>
			<View
				onTouchStart={goBack}
				className='flex-1 items-center  justify-center '
			>
				<View
					onTouchStart={event => event.stopPropagation()}
					className='bg-foreground z-50 w-10/12 items-center rounded-2xl p-4'
				>
					<params.icon
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
						{params.description}
					</Title>

					<Button
						onPress={() => {
							params.onAccept()
							goBack()
						}}
						className='mt-4 w-full'
						variant={params.type}
						size='md'
					>
						{params.acceptText}
					</Button>
					<Button
						onPress={goBack}
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
