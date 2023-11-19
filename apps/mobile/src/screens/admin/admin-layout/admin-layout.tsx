import Header from '@/components/header/header'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import type { AdminLayoutProperties } from '@/screens/admin/admin-layout/admin-layout-types'
import type { HamburgerMenuElementType } from '@/types/global'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'

const AdminLayout: FC<PropsWithChildren<AdminLayoutProperties>> = ({
	children,
	...properties
}) => {
	const { navigate } = useTypedNavigation()
	const hamburgerMenuElements: HamburgerMenuElementType[] = [
		{
			title: 'Books',
			icon: 'book',
			onPress: () => {
				navigate('BookList')
			}
		},
		{
			title: 'Users',
			icon: 'person',
			onPress: () => {
				console.log('Users')
			}
		},
		{
			title: 'Statistic',
			icon: 'graph',
			onPress: () => {
				navigate('Statistic')
			}
		},
		{
			title: 'Shelves',
			icon: 'log',
			onPress: () => {
				console.log('Sheleves')
			}
		},
		{
			title: 'Authors',
			icon: 'mortar-board',
			onPress: () => {
				console.log('Authors')
			}
		}
	]

	return (
		<>
			<Header
				right={{
					hamburger: { elements: hamburgerMenuElements }
				}}
				left={{
					title: properties.title
				}}
			/>
			<View {...properties}>{children}</View>
		</>
	)
}

export default AdminLayout
