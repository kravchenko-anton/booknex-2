import Button from '@/components/ui/button/button'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { AnimatedPressable, AnimatedView } from '@/types/component-types'
import type { FC } from 'react'
import { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated'
// TODO: возможно пофиксить анимацию (может быть баганая)

const Alert: FC = () => {
	const { alert } = useTypedSelector(state => state.alert)
	const { closeAlert } = useAction()
	if (!alert) return null
	return (
		<AnimatedView
			entering={FadeIn}
			exiting={FadeOut}
			onTouchStart={event => {
				event.stopPropagation()
				closeAlert()
			}}
			className='absolute h-full w-full flex-1 items-center justify-center bg-[#0000004a]'>
			<AnimatedPressable
				entering={FadeInDown}
				onTouchStart={event => event.stopPropagation()}
				className='z-50 w-11/12 items-center rounded-xl bg-dust p-4'>
				<Title size={28} className='mb-4 mt-2' center weight={'bold'}>
					{alert.title}
				</Title>
				<Title
					size={16}
					className='px-2'
					weight={'regular'}
					numberOfLines={2}
					center>
					{alert.description}
				</Title>

				<Button
					text={alert.acceptText}
					onPress={() => closeAlert() && alert.onAccept()}
					className='mt-5 w-4/5'
					variant={alert.type}
					size={'medium'}
				/>
				<Button
					onPress={() => closeAlert()}
					text='Cancel'
					className='mt-4 w-2/3'
					variant={'dust'}
					size={'medium'}
				/>
			</AnimatedPressable>
		</AnimatedView>
	)
}

export default Alert
