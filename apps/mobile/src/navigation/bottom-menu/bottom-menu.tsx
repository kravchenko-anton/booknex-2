import MenuItem from '@/navigation/bottom-menu/menu-item'
import type { FC } from 'react'
import { View } from 'react-native'
import type { TypeNavigate } from './menu-data'
import { menuItems } from './menu-data'

interface IBottomMenuProperties {
	currentRoute?: string
	nav: TypeNavigate
}

const BottomMenu: FC<IBottomMenuProperties> = properties => (
	<View className='border-muted bg-background w-full flex-row items-center justify-between overflow-hidden border-t-[1px]  px-4 pb-1 pt-2'>
		{menuItems.map(item => (
			<MenuItem key={item.path} item={item} {...properties} />
		))}
	</View>
)

export default BottomMenu
