import ScrollLayout from '@/components/layout/scroll-layout'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { Title } from 'ui/components'
//TODO: сделать нормальный переиспользуемый layout для всех страниц вместе с хедером

export const HeaderScrollLayout: FC<PropsWithChildren> = ({ children }) => (
	<>
		<View className='absolute top-0 w-full px-6'>
			<Title size={32}>Header</Title>
		</View>
		<ScrollLayout className='mt-14 h-[10000px]'>{children}</ScrollLayout>
	</>
)
