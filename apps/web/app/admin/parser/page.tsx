'use client'

import ParseButton from '@/app/admin/parser/parse-button'
import { useCatalog } from '@/features/parser/catalog/useCatalog'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'
import type { FC } from 'react'

const Parser: FC = () => {
	const { tableProperties, headerProperties, parseButtonProperties } =
		useCatalog()

	return (
		<div className='w-full'>
			<DataTableHeader title='Parser' {...headerProperties}>
				<ParseButton
					onClose={parseButtonProperties.close}
					isOpen={parseButtonProperties.isOpen}
					openParserDialog={parseButtonProperties.open}
				/>
			</DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default Parser
