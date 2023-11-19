import type {
	FlatListProps,
	ImageProps,
	PressableProps,
	ScrollViewProps,
	TextProps,
	ViewProps
} from 'react-native'
import { Pressable, View } from 'react-native'
import Animated from 'react-native-reanimated'

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
export const AnimatedView = Animated.createAnimatedComponent(View)
export type ViewDefaultProperties = Pick<
	ViewProps,
	'className' | 'style' | 'onLayout' | 'pointerEvents' | 'onMagicTap'
>

export type FlatlistDefaultProperties<T> = Pick<
	FlatListProps<T>,
	| 'horizontal'
	| 'onScroll'
	| 'onLayout'
	| 'onScrollBeginDrag'
	| 'onScrollEndDrag'
	| 'onEndReachedThreshold'
	| 'onEndReached'
	| 'ListEmptyComponent'
	| 'keyExtractor'
	| 'style'
	| 'data'
	| 'className'
	| 'snapToInterval'
	| 'snapToAlignment'
	| 'scrollEnabled'
	| 'numColumns'
	| 'contentContainerStyle'
	| 'renderItem'
>
export type PressableDefaultProperties = Pick<
	PressableProps,
	| 'onLayout'
	| 'pointerEvents'
	| 'onPress'
	| 'disabled'
	| 'onBlur'
	| 'onFocus'
	| 'onMagicTap'
	| 'style'
	| 'className'
	| 'onLongPress'
>

export type TextDefaultProperties = Pick<
	TextProps,
	| 'style'
	| 'onPress'
	| 'className'
	| 'onMagicTap'
	| 'onTextLayout'
	| 'onLayout'
	| 'disabled'
	| 'onLongPress'
	| 'numberOfLines'
>

export type ImageDefaultProperties = Pick<
	ImageProps,
	| 'blurRadius'
	| 'onLoad'
	| 'resizeMode'
	| 'resizeMethod'
	| 'progressiveRenderingEnabled'
	| 'onProgress'
	| 'borderRadius'
	| 'fadeDuration'
	| 'defaultSource'
	| 'style'
	| 'className'
	| 'onError'
>
export type ScrollViewDefaultProperties = Pick<
	ScrollViewProps,
	| 'scrollEnabled'
	// onScroll end
	| 'onResponderEnd'
	| 'onTouchEnd'
	| 'children'
	| 'keyboardShouldPersistTaps'
	| 'automaticallyAdjustKeyboardInsets'
	| 'snapToInterval'
	| 'keyboardDismissMode'
	| 'onScroll'
	| 'contentContainerStyle'
	| 'style'
	| 'horizontal'
	| 'pointerEvents'
	| 'className'
	| 'onLayout'
>
