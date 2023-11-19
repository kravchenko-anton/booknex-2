import Field from '@/components/ui/field/field'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const ReaderSearch: FC = () => {
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const { control } = useForm()
	return (
		<View className='px-4'>
			<Field
				backgroundColor={colorScheme.theme.body.background}
				color={Color.white}
				borderColor={colorScheme.theme.p.color}
				control={control}
				name={'searchTerm'}
				placeholder={'Type something...'}
			/>
		</View>
	)
}

export default ReaderSearch
