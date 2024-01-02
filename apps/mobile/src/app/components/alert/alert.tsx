import { AnimatedPressable } from '@/components/animated'
import { useAction, useTypedSelector } from '@/hooks'
import { useClickOutside } from '@/hooks/outside-press/useClickOutside'
import type { FC } from 'react'
import { View } from 'react-native'
import { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { Button, Title } from 'ui/components'
// TODO: возможно пофиксить анимацию (может быть баганая)

const Alert: FC = () => {
	const { alert } = useTypedSelector(state => state.alert)
	const { closeAlert } = useAction()
	const reference = useClickOutside(() => closeAlert())
	if (!alert) return null
	return (
		<View className='absolute h-full w-full flex-1 items-center justify-center'>
			<AnimatedPressable
				ref={reference}
				entering={FadeInDown}
				exiting={FadeOutDown}
				onTouchStart={event => event.stopPropagation()}
				className='bg-foreground z-50 w-11/12 items-center rounded-md p-4'
			>
				<Title size={28} className='mb-4 mt-2' center weight='bold'>
					{alert.title}
				</Title>
				<Title
					size={16}
					className='px-2'
					weight='regular'
					numberOfLines={2}
					center
				>
					{alert.description}
				</Title>

				<Button
					text={alert.acceptText}
					onPress={() => closeAlert() && alert.onAccept()}
					className='mt-5 w-4/5'
					variant={alert.type}
					size='md'
				/>
				<Button
					onPress={() => closeAlert()}
					text='Cancel'
					className='mt-4 w-2/3'
					variant='foreground'
					size='md'
				/>
			</AnimatedPressable>
		</View>
	)
}

export default Alert
