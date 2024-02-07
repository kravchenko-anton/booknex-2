import { useAction, useTypedSelector } from '@/hooks'
import {
	ReaderFont,
	fontSizeSettings,
	type ReaderFontsEnum
} from '@/redux/reader/reading-settings-slice'
import LineHeightIcon from '@/screens/reading/features/sheets/reading/icons/line-height'
import PageMarginIcon from '@/screens/reading/features/sheets/reading/icons/page-margin'
import { themePack } from '@/screens/reading/features/sheets/reading/theme-pack'
import type { DefaultBottomSheetProperties } from '@/screens/reading/features/types'
import { AnimatedPress, Title } from '@/ui'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Color } from 'global/colors'
import { Minus, Plus } from 'icons'
import type { FC } from 'react'
import { Pressable, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { twMerge } from 'tailwind-merge'

const ReadingSettings: FC<DefaultBottomSheetProperties> = ({ close }) => {
	const {
		changePadding,
		changeTheme,
		changeLineHeight,
		changeFontFamily,
		changeFontSize
	} = useAction()
	const { padding, lineHeight, font, fontSize, colorScheme } = useTypedSelector(
		state => state.readingSettings
	)
	return (
		<BottomSheet
			enableContentPanningGesture
			enableHandlePanningGesture
			enablePanDownToClose
			enableOverDrag
			snapPoints={[290, 290]}
			handleIndicatorStyle={{ backgroundColor: colorScheme.colorPalette.text }}
			backgroundStyle={{
				backgroundColor: colorScheme.colorPalette.background.darker
			}}
			backdropComponent={backdropProperties => (
				<BottomSheetBackdrop
					onPress={close}
					{...backdropProperties}
					enableTouchThrough
				/>
			)}
		>
			<Pressable>
				<FlatList
					horizontal
					className='mt-4'
					showsHorizontalScrollIndicator={false}
					data={themePack}
					contentContainerStyle={{
						paddingHorizontal: 8
					}}
					renderItem={({ item: theme }) => (
						<AnimatedPress
							key={`${theme.slug}-${theme.title}`}
							className='mb-4 mr-2 rounded-xl border-2 p-2 px-6'
							style={{
								backgroundColor: theme.colorPalette.background.darker,
								borderColor:
									colorScheme.slug === theme.slug
										? colorScheme.colorPalette.primary
										: Color.transparent
							}}
							onPress={() => changeTheme(theme.slug)}
						>
							<Title
								weight='semiBold'
								size={18}
								style={{ color: theme.colorPalette.text }}
							>
								{theme.title}
							</Title>
						</AnimatedPress>
					)}
				/>
				<View>
					<View className='w-full'>
						<FlatList
							horizontal
							contentContainerStyle={{
								paddingHorizontal: 8
							}}
							data={ReaderFont.map(font => ({
								value: font.fontFamily,
								label: font.title
							}))}
							renderItem={({ item }) => (
								<AnimatedPress
									style={{
										backgroundColor:
											colorScheme.colorPalette.background.lighter,
										borderColor:
											font.fontFamily === item.value
												? colorScheme.colorPalette.secondary
												: Color.transparent
									}}
									className={twMerge(
										' mb-2 mr-2 rounded-xl border-2 border-transparent p-2 px-4',
										item.value === font.fontFamily && 'border-primary '
									)}
									onPress={() =>
										changeFontFamily({
											fontFamily: item.value as ReaderFontsEnum,
											title: item.label
										})
									}
								>
									<Title
										weight='semiBold'
										size={18}
										style={{
											color: colorScheme.colorPalette.text
										}}
									>
										{item.label}
									</Title>
								</AnimatedPress>
							)}
						/>
						<View className='my-1.5 flex-row items-center justify-between px-3'>
							<Title
								weight='semiBold'
								size={22}
								color={colorScheme.colorPalette.text}
							>
								Font size
							</Title>
							<View className='flex-row items-center'>
								<TouchableOpacity
									className='rounded-l-xl p-2 px-4'
									disabled={fontSize === fontSizeSettings.min}
									style={{
										backgroundColor:
											fontSize === fontSizeSettings.min
												? colorScheme.colorPalette.background.normal
												: colorScheme.colorPalette.background.lighter
									}}
									onPress={() => changeFontSize(fontSize - 2)}
								>
									<Minus
										width={30}
										color={colorScheme.colorPalette.text}
										strokeWidth={2}
										height={30}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									className='rounded-r-xl p-2 px-4'
									disabled={fontSize === fontSizeSettings.max}
									style={{
										backgroundColor:
											fontSize === fontSizeSettings.max
												? colorScheme.colorPalette.background.normal
												: colorScheme.colorPalette.background.lighter
									}}
									onPress={() => changeFontSize(fontSize + 2)}
								>
									<Plus
										width={30}
										color={colorScheme.colorPalette.text}
										strokeWidth={2}
										height={30}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View className='mt-6 flex-row items-center justify-center'>
						<View className='mr-4 flex-row items-center'>
							<LineHeightIcon
								lineCount={3}
								backgroundColor={
									lineHeight === 1.8
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
								onPress={() => changeLineHeight(1.8)}
							/>
							<LineHeightIcon
								lineCount={4}
								className='mx-3'
								backgroundColor={
									lineHeight === 1.5
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
								onPress={() => changeLineHeight(1.5)}
							/>
							<LineHeightIcon
								lineCount={5}
								backgroundColor={
									lineHeight === 1.3
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
								onPress={() => changeLineHeight(1.3)}
							/>
						</View>

						<View className='ml-4 flex-row items-center'>
							<PageMarginIcon
								className='p-1  pb-0.5'
								backgroundColor={
									padding === 4
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
								onPress={() => changePadding(4)}
							/>
							<PageMarginIcon
								className='mx-3 p-1.5  pb-0.5'
								backgroundColor={
									padding === 14
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
								onPress={() => changePadding(14)}
							/>
							<PageMarginIcon
								className='p-2 pb-0.5'
								backgroundColor={
									padding === 20
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
								onPress={() => changePadding(20)}
							/>
						</View>
					</View>
				</View>
			</Pressable>
		</BottomSheet>
	)
}

export default ReadingSettings
