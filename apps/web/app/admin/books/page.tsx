'use client'

import DataTable from '@/components/table/data-table'
import DataTableHeader from '@/components/table/table-search'
import { Button } from '@/components/ui'
import { useCatalog } from '@/features/books/catalog/useCatalog'
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
