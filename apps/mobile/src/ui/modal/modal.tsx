import { useTypedNavigation } from '@/hooks'
import type { IconType } from '@/types/global'
import { Button, Title } from '@/ui'
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
}> = ({ acceptText, description, icon: Icon, onAccept, type }) => {
	const { goBack } = useTypedNavigation()
	return (
		<DefaultModal
			transparent
			statusBarTranslucent
			visible
			animationType='fade'
			onRequestClose={goBack}
		>
			<View
				className='flex-1 items-center justify-center'
				style={{
					backgroundColor: `${Color.background}99`
				}}
				onTouchStart={goBack}
			>
				<View
					className='bg-foreground z-50 w-10/12 items-center rounded-2xl p-4'
					onTouchStart={event => event.stopPropagation()}
				>
					<Icon className='mt-2' width={40} height={40} color={Color.gray} />
					<Title
						center
						size={18}
						color={Color.gray}
						className='mb-1 mt-2 px-2'
						weight='semiBold'
						numberOfLines={2}
					>
						{description}
					</Title>

					<Button
						className='mt-4 w-full'
						variant={type}
						size='md'
						onPress={() => {
							onAccept()
							goBack()
						}}
					>
						{acceptText}
					</Button>
					<Button
						className='mt-2 w-full'
						variant='foreground'
						size='md'
						onPress={goBack}
					>
						Cancel
					</Button>
				</View>
			</View>
		</DefaultModal>
	)
}

export default Modal
