import { useTypedNavigation } from '@/shared/hooks'
import type { IconType } from '@/shared/types/global'
import { Button, Title } from '@/shared/ui'
import type { VividPaletteType } from 'global/colors'
import { Color } from 'global/colors'
import type { FC } from 'react'
import { Modal as DefaultModal, View } from 'react-native'

const Modal: FC<{
	icon: IconType
	description: string
	acceptText: string
	type: VividPaletteType
	onAccept: () => void
}> = ({ acceptText, description, icon: Icon = null, onAccept, type }) => {
	const { goBack } = useTypedNavigation()
	return (
		<DefaultModal
			animationType='fade'
			transparent={true}
			statusBarTranslucent={true}
			visible={true}
			onRequestClose={goBack}
		>
			<View
				onTouchStart={goBack}
				style={{
					backgroundColor: `${Color.background}99`
				}}
				className='flex-1 items-center justify-center'
			>
				<View
					onTouchStart={event => event.stopPropagation()}
					className='bg-foreground z-50 w-10/12 items-center rounded-2xl p-4'
				>
					<Icon className='mt-2' width={40} height={40} color={Color.gray} />
					<Title
						size={18}
						color={Color.gray}
						className='mb-1 mt-2 px-2'
						weight='semiBold'
						numberOfLines={2}
						center
					>
						{description}
					</Title>

					<Button
						onPress={() => {
							onAccept()
							goBack()
						}}
						className='mt-4 w-full'
						variant={type}
						size='md'
					>
						{acceptText}
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
		</DefaultModal>
	)
}

export default Modal
