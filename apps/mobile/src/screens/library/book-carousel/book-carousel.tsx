import { BookCard, FlatList, Icon, Title } from '@/components'
import { Smartphone } from '@/global/icons/react-native'
import { shadeRGBColor } from '@/global/utils/shade-color'
import { Color } from '@/ui/colors'

import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native'
//			<Reader className='px-4'>
// 					<Title size={24} weight={'bold'} color={Color.white}>
// 						You have no book
// 					</Title>
// 					<Button
// 						onPress={() => {
// 							navigate('Featured')
// 						}}
// 						size={'medium'}
// 						variant={'secondary'}
// 						text={'Browse book'}
// 						className='mt-4'
// 					/>
// 				</Reader>
const BookCarousel = () => (
	<View className='mt-2'>
		<LinearGradient
			colors={[Color.primary, shadeRGBColor(Color.primary, -30)]}
			className='bg-primary h-[230px] w-full items-center justify-center rounded-t-2xl'>
			<FlatList
				horizontal
				data={[
					{
						id: 1
					},
					{
						id: 2
					},
					{
						id: 3
					},
					{
						id: 4
					},
					{
						id: 5
					},
					{
						id: 6
					},
					{
						id: 7
					},
					{
						id: 8
					}
				]}
				renderItem={() => (
					<BookCard
						image={{
							uri: 'https://m.media-amazon.com/images/I/81IrvFQrwKL._AC_UF1000,1000_QL80_.jpg',
							size: 'small'
						}}
					/>
				)}
			/>
		</LinearGradient>

		<View className='bg-dust h-[60px] items-center justify-center rounded-b-xl px-4'>
			<View className='w-full flex-row items-center justify-between rounded-xl'>
				<View className='flex-row items-center justify-between'>
					<Icon
						icon={Smartphone}
						size={'medium'}
						className='w-[40px] pb-0 pl-0 pt-0'
					/>
					<Title size={20} weight={'bold'}>
						Available offline
					</Title>
				</View>
				<Title size={20} weight={'regular'} color={Color.secondary}>
					{0}
				</Title>
			</View>
		</View>
	</View>
)

export default BookCarousel
