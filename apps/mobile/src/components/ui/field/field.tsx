import Title from '@/components/ui/title/title'
import { fontSettings } from '@/components/ui/title/title-settings'
import { Color } from '@/ui/colors'

import type { Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import type { FieldProperties } from './filed-types'

const Field = <T extends Record<string, any>>({
	wrapperStyle,
	wrapperClassName,
	backgroundColor = Color.vibrant,
	borderColor = Color.secondary,
	color = Color.secondary,
	...properties
}: FieldProperties<T>): JSX.Element | null => (
	<Controller
		control={properties.control}
		name={properties.name}
		rules={properties.rules}
		defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
		render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
			<>
				<View
					style={[
						{
							borderColor: error ? Color.danger : borderColor,
							backgroundColor
						},
						wrapperStyle
					]}
					className={`my-1.5 w-full rounded-xl border-[1px] px-4 pb-3 pt-2  ${wrapperClassName}`}>
					<TextInput
						autoCapitalize='none'
						onBlur={onBlur}
						onChangeText={onChange}
						placeholderTextColor={color}
						defaultValue={properties.defaultValue}
						value={(value ?? '').toString()}
						keyboardAppearance='default'
						renderToHardwareTextureAndroid={true}
						className='text-secondary text-base'
						style={{
							fontFamily: fontSettings.bold
						}}
						{...properties}
					/>
				</View>
				{error && (
					<Title color={Color.danger} size={16}>
						{error.message ?? 'error!'}
					</Title>
				)}
			</>
		)}
	/>
)

export default Field
