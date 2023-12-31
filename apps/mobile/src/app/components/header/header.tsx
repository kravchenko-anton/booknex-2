import { Menu } from '@/components/dropdown/dropdown'
import type { HeaderProperties } from '@/components/header/types'
import { useTypedNavigation } from '@/hooks'
import { share } from '@/utils/share-function'
import { ArrowLeft, Share as ShareIcon } from 'icons'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { AnimatedIcon, Title as TitleComponent } from 'ui/components'
import type { IconProperties } from '../../../../../../libs/ui/react-native/icon/types'

const Head: FC<HeaderProperties> = ({ style, children, ...properties }) => {
	const { goBack } = useTypedNavigation()
	return (
		<View
			className='mt-1 w-full flex-row items-center justify-between'
			style={style}
			{...properties}
		>
			<AnimatedIcon icon={ArrowLeft} size='md' onPress={() => goBack()} />
			{children}
		</View>
	)
}

const Sharing: FC<{
	message: string
}> = ({ message }) => {
	return (
		<AnimatedIcon icon={ShareIcon} size='md' onPress={() => share(message)} />
	)
}

const Icon: FC<
	Omit<
		IconProperties,
		'fullRounded' | 'fatness' | 'noPadding' | 'variant' | 'size'
	>
> = ({ ...properties }) => {
	return <AnimatedIcon size='md' {...properties} />
}

const Title: FC<{ text: string }> = ({ text }) => {
	return (
		<TitleComponent size={24} color={Color.white} weight='bold'>
			{text}
		</TitleComponent>
	)
}

const DropDown: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Menu position='right' size='md'>
			{children}
		</Menu>
	)
}

export { DropDown, Head, Icon, Sharing, Title }
