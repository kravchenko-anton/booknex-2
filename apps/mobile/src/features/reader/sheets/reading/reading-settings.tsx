import {
	fontSizeSettings,
	ReaderFont,
	type ReaderFontsEnum
} from '@/features/reader/action/reading-settings-slice'
import LineHeightIcon from '@/features/reader/sheets/reading/icons/line-height'
import PageMarginIcon from '@/features/reader/sheets/reading/icons/page-margin'
import { themePack } from '@/features/reader/sheets/reading/theme-pack'
import type { DefaultBottomSheetProperties } from '@/features/reader/types'
import { useAction, useTypedSelector } from '@/shared/hooks'
import { AnimatedPress, Title } from '@/shared/ui'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Color } from 'global/colors'
import { Minus, Plus } from 'icons'
import type { FC } from 'react'
import React from 'react'
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
			snapPoints={[290, 290]}
			enableContentPanningGesture={true}
			enableHandlePanningGesture={true}
			enablePanDownToClose={true}
			enableOverDrag={true}
			backgroundStyle={{
				backgroundColor: colorScheme.colorPalette.background.darker
			}}
			handleIndicatorStyle={{ backgroundColor: colorScheme.colorPalette.text }}
			backdropComponent={backdropProperties => (
				<BottomSheetBackdrop
					onPress={close}
					{...backdropProperties}
					enableTouchThrough={true}
				/>
			)}
		>
			<Pressable>
				<FlatList
					className='mt-4'
					contentContainerStyle={{
						paddingHorizontal: 8
					}}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					data={themePack}
					renderItem={({ item: theme }) => {
						return (
							<AnimatedPress
								key={`${theme.slug}-${theme.title}`}
								style={{
									backgroundColor: theme.colorPalette.background.darker,
									borderColor:
										colorScheme.slug === theme.slug
											? colorScheme.colorPalette.primary
											: Color.transparent
								}}
								onPress={() => changeTheme(theme.slug)}
								className='mb-4 mr-2 rounded-xl border-2 p-2 px-6'
							>
								<Title
									weight='semiBold'
									size={18}
									style={{ color: theme.colorPalette.text }}
								>
									{theme.title}
								</Title>
							</AnimatedPress>
						)
					}}
				/>
				<View>
					<View className='w-full'>
						<FlatList
							horizontal
							contentContainerStyle={{
								paddingHorizontal: 8
							}}
							data={ReaderFont.map(font => {
								return {
									value: font.fontFamily,
									label: font.title
								}
							})}
							renderItem={({ item }) => {
								return (
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
								)
							}}
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
									style={{
										backgroundColor:
											fontSize === fontSizeSettings.min
												? colorScheme.colorPalette.background.normal
												: colorScheme.colorPalette.background.lighter
									}}
									className='rounded-l-xl p-2 px-4'
									disabled={fontSize === fontSizeSettings.min}
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
									style={{
										backgroundColor:
											fontSize === fontSizeSettings.max
												? colorScheme.colorPalette.background.normal
												: colorScheme.colorPalette.background.lighter
									}}
									className='rounded-r-xl p-2 px-4'
									disabled={fontSize === fontSizeSettings.max}
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
								onPress={() => changeLineHeight(1.8)}
								backgroundColor={
									lineHeight === 1.8
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
							/>
							<LineHeightIcon
								lineCount={4}
								className='mx-3'
								onPress={() => changeLineHeight(1.5)}
								backgroundColor={
									lineHeight === 1.5
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
							/>
							<LineHeightIcon
								lineCount={5}
								onPress={() => changeLineHeight(1.3)}
								backgroundColor={
									lineHeight === 1.3
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
							/>
						</View>

						<View className='ml-4 flex-row items-center'>
							<PageMarginIcon
								className='p-1  pb-0.5'
								onPress={() => changePadding(4)}
								backgroundColor={
									padding === 4
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
							/>
							<PageMarginIcon
								className='mx-3 p-1.5  pb-0.5'
								onPress={() => changePadding(14)}
								backgroundColor={
									padding === 14
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
							/>
							<PageMarginIcon
								className='p-2 pb-0.5'
								onPress={() => changePadding(20)}
								backgroundColor={
									padding === 20
										? colorScheme.colorPalette.primary
										: colorScheme.colorPalette.text
								}
							/>
						</View>
					</View>
				</View>
			</Pressable>
		</BottomSheet>
	)
}

export default ReadingSettings
