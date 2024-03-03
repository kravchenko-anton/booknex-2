import { cn } from '@/utils'
import { Color, InnerColor } from 'global/colors'
import type { Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { Title } from '../index'
import { fontSettings } from '../title/settings'
import { settings } from './settings'
import type { FieldProperties } from './types'

const Field = <T extends Record<string, any>>({
	variant = 'foreground',
	icon: Icon,
	className = '',
	style = {},
	isArea = false,
	...properties
}: FieldProperties<T>): JSX.Element | null => (
	<Controller
		control={properties.control}
		name={properties.name}
		defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
		render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
			<>
				<View
					style={style}
					className={cn(
						'relative my-1 flex w-full justify-center rounded-lg border-[1px] border-transparent px-2 py-0.5',
						error && 'border-danger',
						Icon && 'pl-9',
						settings.colors[variant],
						className
					)}
				>
					<TextInput
						renderToHardwareTextureAndroid
						className='text-lg'
						autoCapitalize='none'
						placeholderTextColor={Color.gray}
						defaultValue={properties.defaultValue}
						value={value}
						keyboardAppearance='dark'
						multiline={isArea}
						style={[
							{
								fontFamily: fontSettings.bold,
								color: InnerColor[variant]
							},
							isArea && {
								height: 140,
								textAlignVertical: 'top'
							}
						]}
						onBlur={onBlur}
						onChangeText={onChange}
						{...properties}
					/>
					{Icon ? (
						<Icon
							width={20}
							color={Color.gray}
							height={20}
							className='absolute left-2.5'
						/>
					) : null}
				</View>
				{error ? (
					<Title color={Color.danger} size={'md'}>
						{error.message ?? 'error!'}
					</Title>
				) : null}
			</>
		)}
	/>
)

export default Field
