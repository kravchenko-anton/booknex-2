import { useTypedSelector } from '@/hooks/useTypedSelector'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Field } from 'ui/components'

const ReaderSearch: FC = () => {
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const { control } = useForm()
	return (
		<View className='px-4'>
			<Field
				backgroundColor={colorScheme.colorPalette.background.darker}
				color={Color.white}
				borderColor={colorScheme.colorPalette.background.darker}
				control={control}
				name='searchTerm'
				placeholder='Type something...'
			/>
		</View>
	)
}

export default ReaderSearch
