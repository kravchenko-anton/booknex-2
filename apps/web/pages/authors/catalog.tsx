import { useData } from '@/features/author/catalog/useData'
import CreateAuthor from '@/features/author/sheets/create/create-author'
import { useSheetContext } from '@/shared/providers/sheet-provider'
import { Button } from '@/shared/ui'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'

const AuthorCatalog = () => {
	const { headerProperties, tableProperties } = useData()
	const { showSheet, closeSheet } = useSheetContext()

	return (
		<div className='w-full'>
			<DataTableHeader title='Authors' {...headerProperties}>
				<Button
					size='sm'
					variant='primary'
					onClick={() => showSheet(<CreateAuthor onCreate={closeSheet} />)}
				>
					Create
				</Button>
			</DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default AuthorCatalog
