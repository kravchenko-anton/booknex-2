import type { FlatListProps, ImageProps, PressableProps, ScrollViewProps, TextProps, ViewProps } from 'react-native'

export type ViewDefaultProperties = Pick<
	ViewProps,
	| 'onLayout' | 'pointerEvents' | 'onMagicTap'
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
	| 'data'
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
	| 'onLongPress'
>

export type TextDefaultProperties = Pick<
	TextProps,
	| 'style'
	| 'onPress'
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
	| 'horizontal'
	| 'pointerEvents'
	| 'onLayout'
>
