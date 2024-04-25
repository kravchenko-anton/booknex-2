import { AnimatedPress, Flatlist, Image, Title } from '@/ui'
import { windowWidth } from '@/utils/dimensions'
import { Color } from 'global/colors'

const CatalogList = ({
	data,
	disabledScroll = false,
	onElementPress = () => null
}: {
	disabledScroll?: boolean
	data: {
		slug: string
		title: string
		picture: string
	}[]
	onElementPress?: (slug: string) => void
}) => (
	<Flatlist
		scrollEnabled={!disabledScroll}
		mt={10}
		className='w-full px-4'
		data={data}
		numColumns={2}
		ListEmptyComponent={() => (
			<Title className='mx-auto' size={'md'} color={Color.gray} weight='medium'>
				It's quiet, too quiet
			</Title>
		)}
		columnWrapperStyle={{
			justifyContent: 'space-between'
		}}
		renderItem={({ item: book }) => (
			<AnimatedPress
				className='mb-4 w-[46%]'
				onPress={() => onElementPress(book.slug)}>
				<Image
					className='mb-1 w-full'
					url={book.picture}
					height={windowWidth / 3}
				/>
				<Title
					color={Color.gray}
					size={'md'}
					numberOfLines={2}
					weight='semiBold'>
					{book.title}
				</Title>
			</AnimatedPress>
		)}
	/>
)

export default CatalogList
