'use client'

import { useData } from '@/app/admin/parser/useData'
import DataTable from '@/components/data-table'
import DataTableHeader from '@/components/table-search'
import { Button } from '@/components/ui'
import type { FC } from 'react'

const Parser: FC = () => {
	const { tableProperties, headerProperties, parseFunctions } = useData()

	return (
		<div className='w-full'>
			<DataTableHeader title='Parser' {...headerProperties}>
				<Button
					onClick={parseFunctions.onClick}
					isLoading={parseFunctions.isLoading}
					size='sm'
					variant='primary'
				>
					Parsing
				</Button>
			</DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default Parser
