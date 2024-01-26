import { useBooks } from '@/features/books/catalog/useBooks'
import { Button } from '@/shared/ui'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'

const BookCatalog = () => {
	const { headerProperties, tableProperties, onCreateButtonClick } = useBooks()
	return (
		<div className='w-full'>
			<DataTableHeader title='Books' {...headerProperties}>
				<Button onClick={onCreateButtonClick} size='sm' variant='primary'>
					Create
				</Button>
			</DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default BookCatalog
