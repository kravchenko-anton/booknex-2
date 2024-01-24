import { AnimatedPress, Flatlist, Image, Title } from '@/shared/ui'
import { settings } from '@/shared/ui/book-card/settings'
import { Color } from 'global/colors'

const CatalogList = ({
	data,
	disabledScroll = false,
	onElementPress = () => {}
}: {
	disabledScroll?: boolean
	data: {
		id: number
		title: string
		picture: string
	}[]
	onElementPress?: (id: number) => void
}) => {
	return (
		<Flatlist
			scrollEnabled={!disabledScroll}
			mt={10}
			ListEmptyComponent={() => {
				return (
					<Title
						className='mx-auto'
						size={16}
						color={Color.gray}
						weight='medium'
					>
						Nothing here
					</Title>
				)
			}}
			className='w-full px-4'
			numColumns={2}
			columnWrapperStyle={{
				justifyContent: 'space-between'
			}}
			data={data}
			renderItem={({ item: book }) => (
				<AnimatedPress
					onPress={() => onElementPress(book.id)}
					className='mb-4 w-[48%]'
				>
					<Image
						className='mb-1 w-full'
						height={settings.height.md * 1.1}
						url={book.picture}
					/>
					<Title color={Color.gray} size={16} weight='semiBold'>
						{book.title}
					</Title>
				</AnimatedPress>
			)}
		/>
	)
}

export default CatalogList
