'use client'

import ParseButton from '@/app/admin/parser/_ui/parse-button'
import { useCatalog } from '@/app/admin/parser/useCatalog'
import DataTable from '@/components/table/data-table'
import DataTableHeader from '@/components/table/table-search'

import type { FC } from 'react'

const Parser: FC = () => {
	const { tableProperties, headerProperties, parseButtonProperties } =
		useCatalog()

	return (
		<div className='w-full'>
			<DataTableHeader title='Parser' {...headerProperties}>
				<ParseButton
					isOpen={parseButtonProperties.isOpen}
					openParserDialog={parseButtonProperties.open}
					onClose={parseButtonProperties.close}
				/>
			</DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default Parser
