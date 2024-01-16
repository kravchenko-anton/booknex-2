'use client'

import { useParser } from '@/app/admin/parser/useParser'
import DataTable from '@/components/data-table'
import DataTableHeader from '@/components/table-search'
import { Button } from '@/components/ui'
import type { FC } from 'react'
import * as React from 'react'

const Parser: FC = () => {
	const { tableProperties, onSearchSubmit, parse } = useParser()
	console.log(
		tableProperties.currentPage,
		tableProperties.totalPages,
		tableProperties.next.disabled
	)
	return (
		<div className='w-full'>
			<DataTableHeader onSearchSubmit={onSearchSubmit}>
				<Button
					onClick={parse.onClick}
					isLoading={parse.isLoading}
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
