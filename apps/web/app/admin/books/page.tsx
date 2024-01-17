'use client'
import { useBooks } from '@/app/admin/books/useBooks'
import DataTable from '@/components/data-table'
import DataTableHeader from '@/components/table-search'
import { Button } from '@/components/ui'
import type { FC } from 'react'
import * as React from 'react'

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
