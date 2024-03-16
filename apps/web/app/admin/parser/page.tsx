'use client'

import {
	bookRoute,
	parserCatalogRoute,
	parserRoute
} from '@/app/admin/book/_shared/route-names'
import ParseButton from '@/app/admin/parser/_ui/parse-button'
import { columns } from '@/app/admin/parser/columns'
import { useQueries } from '@/app/admin/parser/useQueries'
import DataTable from '@/components/catalog/data-table'
import DataTableHeader from '@/components/catalog/table-search'
import { useTableParameters } from '@/hooks/useTableParameters'
import { generateParameters } from '@/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

import type { FC } from 'react'

const Parser: FC = () => {
	const { page, searchTerm, dialog } = useTableParameters()
	const router = useRouter()
	const { books, deleteFromParser } = useQueries({
		page,
		searchTerm
	})

	const table = useReactTable({
		data: books?.data ?? [],
		columns: columns({
			remove: (id: number) => deleteFromParser(id),
			useAsTemplate: id => router.push(`${bookRoute}/create?template=${id}`)
		}),
		getCoreRowModel: getCoreRowModel()
	})

	return (
		<div className='w-full'>
			<DataTableHeader
				title='Parser'
				defaultTerm={searchTerm}
				onSearchSubmit={term => {
					router.replace(
						generateParameters(parserCatalogRoute, {
							searchTerm: term.searchTerm
						})
					)
				}}
			>
				<ParseButton
					isOpen={dialog === 'parse'}
					openParserDialog={() =>
						router.replace(
							generateParameters(parserCatalogRoute, { dialog: 'parse' })
						)
					}
					onClose={() => router.replace(parserRoute)}
				/>
			</DataTableHeader>
			<DataTable
				table={table}
				totalPages={books?.totalPages ?? 0}
				currentPage={page}
				canLoadMore={books?.canLoadMore}
			/>
		</div>
	)
}

export default Parser
