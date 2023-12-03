import { Header, LargeHeaderScrollLayout, Title } from '@/components'
import type { BookLayoutProperties } from '@/screens/book/book-layout/book-layout-types'
import { Color } from '@/ui/colors'

import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'

const BookLayout: FC<PropsWithChildren<BookLayoutProperties>> = ({
	children,
	...properties
}) => (
	<LargeHeaderScrollLayout
		animatedHeader={{
			title: properties.title,
			transientValue: 85,
			right: {
				hamburger: {
					elements: properties.hamburgerMenuElements
				}
			}
		}}
		headerChildren={
			<View
				style={{
					backgroundColor: properties.backgroundColor
				}}
				className='h-[230px] p-4 pt-0'>
				<Header
					color={Color.white}
					right={{
						sharing: `Wow! I see ${properties.title} book on Booknex and I think you will like it too!`
					}}
				/>
				<Title size={26} color={Color.white} weight={'bold'} numberOfLines={2}>
					{properties.title}
				</Title>
				<Title
					size={18}
					className='mt-2 w-1/2'
					weight={'bold'}
					onPress={() => {
						properties.author.navigate(properties.author.id)
					}}
					color={Color.shade}>
					{properties.author.name}
				</Title>
			</View>
		}>
		{children}
	</LargeHeaderScrollLayout>
)

export default BookLayout
