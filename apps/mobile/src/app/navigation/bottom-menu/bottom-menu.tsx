import MenuItem from '@/navigation/bottom-menu/menu-item'

import type { FC } from 'react'
import { View } from 'react-native'
import type { TypeNavigate } from './menu-data'
import { menuItems } from './menu-data'

interface IBottomMenu {
	currentRoute?: string
	nav: TypeNavigate
}

const BottomMenu: FC<IBottomMenu> = properties => (
	<View className='border-vibrant bg-shade w-full flex-row items-center justify-between border-t-[1px]  px-4 pb-1 pt-2'>
		{menuItems.map(item => (
			<MenuItem key={item.path} item={item} {...properties} />
		))}
	</View>
)

export default BottomMenu
