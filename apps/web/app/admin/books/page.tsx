'use client'
import { useCatalog } from '@/features/books/catalog/useCatalog'
import { Button } from '@/shared/ui'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'
import type { FC } from 'react'

const Page: FC = () => {
	const { headerProperties, tableProperties, onCreateButtonClick } =
		useCatalog()
	return (
		<div className='w-full'>
			<DataTableHeader title='Books' {...headerProperties}>
				<Button size='sm' variant='primary' onClick={onCreateButtonClick}>
					Create
				</Button>
			</DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}
export default Page
