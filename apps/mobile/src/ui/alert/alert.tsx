import type { IconType } from '@/types/global'
import { Button, Title } from '@/ui'
import type { VividPaletteType } from 'global/colors'
import { Color } from 'global/colors'
import type { FunctionType } from 'global/types'
import type { FC } from 'react'
import { Modal as DefaultModal, View } from 'react-native'

interface AlertProperties {
	icon: IconType
	description: string
	acceptText: string
	type: VividPaletteType
	onAccept: FunctionType
	onClose: FunctionType
}

const Alert: FC<AlertProperties> = ({
	icon: Icon,
	onAccept,
	onClose,
	...properties
}) => (
	<DefaultModal
		transparent
		statusBarTranslucent
		visible
		animationType='fade'
		onRequestClose={onClose}>
		<View
			className='flex-1 items-center justify-center'
			style={{
				backgroundColor: `${Color.background}99`
			}}
			onTouchStart={onClose}>
			<View
				className='bg-foreground z-50 w-9/12 items-center rounded p-4'
				onTouchStart={event => event.stopPropagation()}>
				<Icon className='mt-2' width={40} height={40} color={Color.gray} />
				<Title
					center
					size={'lg'}
					color={Color.gray}
					className='mb-1 mt-2 px-2'
					weight='semiBold'
					numberOfLines={2}>
					{properties.description}
				</Title>

				<Button
					className='mt-4 w-full'
					variant={properties.type}
					size='md'
					onPress={() => {
						onAccept()
						onClose()
					}}>
					{properties.acceptText}
				</Button>
				<Button
					className='mt-2 w-full'
					variant='foreground'
					size='md'
					onPress={onClose}>
					Cancel
				</Button>
			</View>
		</View>
	</DefaultModal>
)

export default Alert
