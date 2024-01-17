'use client'
import { useData } from '@/app/admin/authors/useData'
import DataTable from '@/components/data-table'
import DataTableHeader from '@/components/table-search'
import { Button } from '@/components/ui'
import type { FC } from 'react'
import * as React from 'react'

const PageDetails: FC = () => {
	const { headerProperties, createAuthor, tableProperties } = useData()
	return (
		<div className='w-full'>
			<DataTableHeader title='Authors' {...headerProperties}>
				<Button size='sm' variant='primary' onClick={() => createAuthor()}>
					Create
				</Button>
			</DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default PageDetails
