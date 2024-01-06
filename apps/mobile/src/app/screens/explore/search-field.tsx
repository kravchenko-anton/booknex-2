import { AnimatedPress } from '@/components'
import { useTypedNavigation } from '@/hooks'
import { Search } from 'icons'
import { Icon, Title } from 'ui/components'

const SearchField = () => {
	const { navigate } = useTypedNavigation()
	return (
		<AnimatedPress
			onPress={() => navigate('Search')}
			className='border-vibrant bg-foreground mx-2 flex-row items-center rounded-xl border-[1px] p-2.5'
		>
			<Icon icon={Search} size='md' variant='foreground' noPadding />
			<Title weight='medium' size={20} className='ml-2'>
				Type anything to search...
			</Title>
		</AnimatedPress>
	)
}

export default SearchField
