import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import FlatList from '@/components/ui/flatlist/flatlist'
import BigLoader from '@/components/ui/loader/big-loader'
import { useComprehensiveList } from '@/screens/library/comprehensive-list/useComprehensive-list'

const ComprehensiveList = () => {
	const { listElement, library, type } = useComprehensiveList()
	if (!library) return <BigLoader />
	return (
		<Layout>
			<Header
				right={{
					title: library.title
				}}
			/>
			<FlatList
				mt={0}
				scrollEnabled={false}
				data={library[type] as []}
				renderItem={listElement}
			/>
		</Layout>
	)
}

export default ComprehensiveList
