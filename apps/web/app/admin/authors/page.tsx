'use client'
import { useCreateButton } from '@/app/admin/authors/additional-functions'
import { useAuthors } from '@/app/admin/authors/useAuthors'
import DataTable from '@/components/data-table'
import DataTableHeader from '@/components/table-search'
import { Button } from '@/components/ui'
import type { FC } from 'react'
import * as React from 'react'

const PageDetails: FC = () => {
	const { headerProperties, tableProperties } = useAuthors()
	const { createAuthor } = useCreateButton()
	return (
		<div className='w-full'>
			<DataTableHeader {...headerProperties}>
				<Button size='sm' variant='primary' onClick={() => createAuthor()}>
					Create
				</Button>
			</DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default PageDetails
