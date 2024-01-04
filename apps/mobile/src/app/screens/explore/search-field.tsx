import { PressableContainer } from '@/components'
import { useTypedNavigation } from '@/hooks'
import { Search } from 'icons'
import { Icon, Title } from 'ui/components'

const SearchField = () => {
	const { navigate } = useTypedNavigation()
	return (
		<PressableContainer
			onPress={() => navigate('Search')}
			className='border-foreground bg-shade mx-2 flex-row items-center rounded-xl border-2 p-1'
		>
			<Icon icon={Search} size='md' variant='shade' />
			<Title weight='medium'>Type to search...</Title>
		</PressableContainer>
	)
}

export default SearchField
