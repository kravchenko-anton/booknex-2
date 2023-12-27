import MenuItem from '@/navigation/bottom-menu/menu-item'

import type { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Color } from 'ui/colors'
import type { TypeNavigate } from './menu-data'
import { menuItems } from './menu-data'

interface IBottomMenu {
	currentRoute?: string
	nav: TypeNavigate
}

const BottomMenu: FC<IBottomMenu> = properties => (
	<View
		style={{
			...StyleSheet.absoluteFillObject,
			justifyContent: 'center',
			alignItems: 'center'
		}}
	>
		<View
			className='absolute bottom-2 w-3/4 flex-row items-center justify-between rounded-3xl p-3'
			style={{
				backgroundColor: Color.shade
			}}
		>
			{menuItems.map(item => (
				<MenuItem key={item.path} item={item} {...properties} />
			))}
		</View>
	</View>
)

export default BottomMenu
