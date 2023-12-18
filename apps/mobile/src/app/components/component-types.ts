import type { CSSProperties } from 'react'
import type { FlatListProps, ImageProps, PressableProps, ScrollViewProps, TextProps, ViewProps } from 'react-native'
import type { Interpolation } from 'styled-components'

export type ViewDefaultProperties = Pick<
	ViewProps,
	| 'onLayout' | 'pointerEvents' | 'onMagicTap'
> & {
	styles: Interpolation<CSSProperties>
}

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
> & {
	styles: Interpolation<CSSProperties>
}
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
> & {
	styles: Interpolation<CSSProperties>
}

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
> & {
	styles: Interpolation<CSSProperties>
}

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
> & {
	styles: Interpolation<CSSProperties>
}
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
> & {
	styles: Interpolation<CSSProperties>
}
