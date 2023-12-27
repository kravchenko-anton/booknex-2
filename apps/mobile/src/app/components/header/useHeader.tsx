import type {
	HeaderProperties,
	LeftHeaderElementType
} from '@/components/header/types'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { ArrowLeft, Share as ShareIcon } from 'icons'
import { Share } from 'react-native'
import type { ColorProperties, LineColorType } from 'ui/colors'
import { AnimatedIcon, HamburgerMenu, Title } from 'ui/components'

export const HeaderElementComponent = (
	type: string,
	properties: LeftHeaderElementType,
	color: LineColorType,
	position: 'left' | 'right'
) => {
	switch (type) {
		default: {
			return null
		}
		case 'icon': {
			return properties.icon && <AnimatedIcon size='md' {...properties.icon} />
		}
		case 'title': {
			return (
				properties.title && (
					<Title size={24} color={color} weight='bold'>
						{properties.title}
					</Title>
				)
			)
		}
		case 'hamburger': {
			return (
				properties.hamburger && (
					<HamburgerMenu
						position={position}
						color={color}
						elements={properties.hamburger.elements}
					/>
				)
			)
		}
		case 'sharing': {
			return (
				properties.sharing && (
					<AnimatedIcon
						icon={ShareIcon}
						size='md'
						onPress={() =>
							Share.share({
								message:
									properties.sharing ||
									'Booknex is the best reading app, you should try it.'
							})
						}
					/>
				)
			)
		}
	}
}

export const useHeader = (
	properties: {
		left: LeftHeaderElementType
	} & Pick<HeaderProperties, 'right'> &
		Required<ColorProperties>
) => {
	const { goBack } = useTypedNavigation()

	return {
		leftComponent: properties.left.back ? (
			<AnimatedIcon
				icon={ArrowLeft}
				size='md'
				onPress={() => {
					goBack()
				}}
			/>
		) : (
			HeaderElementComponent(
				Object.keys(properties.left)[0] || 'back',
				properties.left,
				properties.color as LineColorType,
				'left'
			)
		),
		rightComponent: properties.right
			? HeaderElementComponent(
					Object.keys(properties.right)[0] || 'back',
					properties.right,
					properties.color as LineColorType,
					'right'
				)
			: null
	}
}
