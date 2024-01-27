'use client'
import { useBooks } from '@/features/books/catalog/useBooks'
import { Button } from '@/shared/ui'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'
import type { FC } from 'react'

const Page: FC = () => {
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
export default Page
