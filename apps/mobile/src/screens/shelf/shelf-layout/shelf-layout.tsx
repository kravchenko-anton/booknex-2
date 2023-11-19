import Header from '@/components/header/header'
import LargeHeaderScrollLayout from '@/components/layout/header-scroll-layout/large-header-scroll-layout'
import { Title } from '@/components/ui/title/title'
import type { ShelfLayoutProperties } from '@/screens/shelf/shelf-layout/shelf-layout-types'
import { getFileUrl } from '@/services/api-config'
import { Color } from '@/utils/color'
import type { FC, PropsWithChildren } from 'react'
import { ImageBackground, View } from 'react-native'

const ShelfLayout: FC<PropsWithChildren<ShelfLayoutProperties>> = ({
	children,
	...properties
}) => (
		<LargeHeaderScrollLayout
			animatedHeader={{
				title: properties.title,
				transientValue: 85,
				right: {
					sharing: `Check out ${properties.title} shelf on Booknex! It's awesome!`
				}
			}}
			headerChildren={
				<ImageBackground
					source={{ uri: getFileUrl(properties.backgroundImage) }}
					className='h-[250px]'>
					<View className='flex-1 bg-[#0000009a] p-4 pt-0'>
						<Header
							color={Color.white}
							right={{
								sharing: `Check out ${properties.title} shelf on Booknex! It's awesome!`
							}}
						/>
						<Title
							size={26}
							color={Color.white}
							center={true}
							weight={'bold'}
							numberOfLines={2}>
							{properties.title}
						</Title>
					</View>
				</ImageBackground>
			}>
			{children}
		</LargeHeaderScrollLayout>
	)

export default ShelfLayout
