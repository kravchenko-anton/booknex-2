import { Search } from 'icons'
import { View } from 'react-native'
import { Icon, Title } from 'ui/components'

const SearchField = () => {
	return (
		<View className='border-foreground bg-shade mx-2 flex-row items-center rounded-xl border-2 p-1'>
			<Icon icon={Search} size='md' variant='shade' />
			<Title weight='medium'>Type to search...</Title>
		</View>
	)
}

export default SearchField
