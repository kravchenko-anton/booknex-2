import type { Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { Color } from '../../colors'
import { Title } from '../index'
import { fontSettings } from '../title/settings'
import type { FieldProperties } from './types'

const Field = <T extends Record<string, any>>({
	backgroundColor = Color.vibrant,
	borderColor = Color.vibrant,
	color = Color.white,
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
					style={{
						borderColor: error ? Color.danger : borderColor,
						backgroundColor
					}}
					className='my-1.5 w-full rounded-xl border-[1px] px-4 py-0.5'
				>
					<TextInput
						autoCapitalize='none'
						onBlur={onBlur}
						onChangeText={onChange}
						placeholderTextColor={color}
						defaultValue={properties.defaultValue}
						value={(value ?? '').toString()}
						keyboardAppearance='dark'
						renderToHardwareTextureAndroid={true}
						className='text-base text-white'
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
