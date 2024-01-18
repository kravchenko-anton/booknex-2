'use client'
import CreateAuthor from '@/app/admin/authors/create/create'
import { useData } from '@/app/admin/authors/useData'
import DataTable from '@/components/data-table'
import DataTableHeader from '@/components/table-search'
import { Button } from '@/components/ui'
import { useSheetContext } from '@/providers/sheet-provider'
import type { FC } from 'react'

const PageDetails: FC = () => {
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

export default PageDetails
