import MenuItem from '@/navigation/bottom-menu/menu-item'

import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { menuItems } from './menu-data'

import type { TypeNavigate } from './menu.interface'

interface IBottomMenu {
	currentRoute?: string
	nav: TypeNavigate
}

const BottomMenu: FC<IBottomMenu> = properties => (
	<View
		className="border-t-solid w-full flex-row items-center justify-between border-t px-2 pb-2 pt-3"
		style={{
			borderTopColor: Color.gray,
			backgroundColor: Color.foreground
		}}>
		{menuItems.map(item => (
			<MenuItem key={item.path} item={item} {...properties} />
		))}
	</View>
)

export default BottomMenu
