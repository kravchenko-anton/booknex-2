'use client'

import { useData } from '@/features/parser/catalog/useData'
import { Button } from '@/shared/ui'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'
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
