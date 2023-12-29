import type { Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Color, InnerColor } from '../../colors'
import { Title } from '../index'
import { fontSettings } from '../title/settings'
import { settings } from './settings'
import type { FieldProperties } from './types'

const Field = <T extends Record<string, any>>({
	variant = 'foreground',
	icon: Icon,
	className = '',
	...properties
}: FieldProperties<T>): JSX.Element | null => (
	<Controller
		control={properties.control}
		name={properties.name}
		defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
		render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
			<>
				<View
					className={twMerge(
						'relative my-1 flex w-full  justify-center rounded-md border-[1px] border-transparent px-4 py-0.5',
						error && 'border-danger',
						Icon && 'pl-9',
						settings.colors[variant],
						className
					)}
				>
					<TextInput
						autoCapitalize='none'
						onBlur={onBlur}
						onChangeText={onChange}
						placeholderTextColor={InnerColor[variant]}
						defaultValue={properties.defaultValue}
						value={value}
						keyboardAppearance='dark'
						renderToHardwareTextureAndroid={true}
						style={{
							fontFamily: fontSettings.bold,
							color: InnerColor[variant]
						}}
						{...properties}
					/>
					{Icon && (
						<Icon
							width={20}
							color={InnerColor[variant]}
							height={20}
							className=' absolute left-2.5'
						/>
					)}
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
