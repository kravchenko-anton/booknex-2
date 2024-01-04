import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import type { ReaderFontsEnum } from '@/redux/reading-settings/reading-settings-slice'
import {
	fontSizeSettings,
	ReaderFont
} from '@/redux/reading-settings/reading-settings-slice'
import LineHeightIcon from '@/screens/reading/settings/sheet/reading/font-settings/icons/line-height'
import PageMarginIcon from '@/screens/reading/settings/sheet/reading/font-settings/icons/page-margin'
import { Minus, Plus } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Color } from 'ui/colors'
import { Icon, Select } from 'ui/components'

const FontSettings: FC = () => {
	const { padding, lineHeight, font, fontSize } = useTypedSelector(
		state => state.readingSettings
	)
	const { changePadding, changeLineHeight, changeFontFamily, changeFontSize } =
		useAction()
	console.log(fontSize)
	return (
		<View className='px-4'>
			<View className='mt-4 w-full flex-row  items-center justify-between'>
				<Select
					onSelect={value => {
						changeFontFamily({
							fontFamily: value.value as ReaderFontsEnum,
							title: value.label
						})
					}}
					color={Color.white}
					backgroundColor={Color.shade}
					elements={ReaderFont.map(font => {
						return {
							value: font.fontFamily,
							label: font.title
						}
					})}
					active={{
						value: font.fontFamily,
						label: font.title
					}}
				/>

				<View className='flex-row items-center'>
					<TouchableOpacity
						disabled={fontSize === fontSizeSettings.min}
						onPress={() => {
							changeFontSize(fontSize - 2)
						}}
					>
						<Icon
							className='w-[50px] rounded-r-none border-r-0 p-2'
							variant={fontSize === fontSizeSettings.min ? 'vibrant' : 'shade'}
							icon={Minus}
							size='md'
						/>
					</TouchableOpacity>
					<TouchableOpacity
						disabled={fontSize === fontSizeSettings.max}
						onPress={() => {
							changeFontSize(fontSize + 2)
						}}
					>
						<Icon
							variant={fontSize === fontSizeSettings.max ? 'vibrant' : 'shade'}
							icon={Plus}
							className='w-[50px] rounded-l-none p-2'
							size='md'
						/>
					</TouchableOpacity>
				</View>
			</View>

			<View className='mt-6 flex-row items-center justify-center'>
				<View className='mr-4 flex-row items-center'>
					<LineHeightIcon
						lineCount={3}
						onPress={() => changeLineHeight(1.8)}
						backgroundColor={lineHeight === 1.8 ? Color.primary : Color.white}
					/>
					<LineHeightIcon
						lineCount={4}
						className='mx-3'
						onPress={() => changeLineHeight(1.5)}
						backgroundColor={lineHeight === 1.5 ? Color.primary : Color.white}
					/>
					<LineHeightIcon
						lineCount={5}
						onPress={() => changeLineHeight(1.3)}
						backgroundColor={lineHeight === 1.3 ? Color.primary : Color.white}
					/>
				</View>

				<View className='ml-4 flex-row items-center'>
					<PageMarginIcon
						className='p-1  pb-0.5'
						onPress={() => changePadding(8)}
						backgroundColor={padding === 8 ? Color.primary : Color.white}
					/>
					<PageMarginIcon
						className='mx-3 p-1.5  pb-0.5'
						onPress={() => changePadding(14)}
						backgroundColor={padding === 14 ? Color.primary : Color.white}
					/>
					<PageMarginIcon
						className='p-2 pb-0.5'
						onPress={() => changePadding(20)}
						backgroundColor={padding === 20 ? Color.primary : Color.white}
					/>
				</View>
			</View>
		</View>
	)
}

export default FontSettings
