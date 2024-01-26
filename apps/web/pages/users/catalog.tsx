import { useData } from '@/features/users/catalog/useData'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'

const UserCatalog = () => {
	const { headerProperties, tableProperties } = useData()
	return (
		<div className='w-full'>
			<DataTableHeader title='Users' {...headerProperties}></DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default UserCatalog
