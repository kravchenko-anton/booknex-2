'use client'

import { _columns } from '@/app/admin/parser/catalog/_columns'
import { _useQueries } from '@/app/admin/parser/catalog/_useQueries'
import ParseButton from '@/app/admin/parser/parse-template/parse-button'
import DataTable from '@/components/catalog/data-table'
import DataTableHeader from '@/components/catalog/table-search'
import { useTableParameters } from '@/hooks/useTableParameters'
import { generateParameters } from '@/utils/generate-parameters'
import { secureRoutes } from '@/utils/route'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

import Loader from '@/components/ui/loader/loader'
import { Suspense, type FC } from 'react'

const Parser: FC = () => {
	const { page, searchTerm, dialog } = useTableParameters()
	const router = useRouter()
	const { books, deleteTemplate, deleteTemplateLoading } = _useQueries({
		page,
		searchTerm
	})

	const table = useReactTable({
		data: books?.data ?? [],
		columns: _columns({
			remove: (slug: string) => deleteTemplate(slug),
			removeLoading: deleteTemplateLoading,
			useAsTemplate: slug =>
				router.push(secureRoutes.bookCreateWithTemplateRoute(slug))
		}),

		getCoreRowModel: getCoreRowModel()
	})

	return (
		<Suspense fallback={<Loader />}>
			<div className='w-full'>
				<DataTableHeader
					title='Parser'
					defaultTerm={searchTerm}
					onSearchSubmit={term => {
						router.replace(
							generateParameters(secureRoutes.parserCatalogRoute, {
								searchTerm: term.searchTerm
							})
						)
					}}>
					<ParseButton
						isOpen={dialog === 'parse'}
						openParserDialog={() =>
							router.replace(
								generateParameters(secureRoutes.parserCatalogRoute, {
									dialog: 'parse'
								})
							)
						}
						onClose={() => router.replace(secureRoutes.parserCatalogRoute)}
					/>
				</DataTableHeader>
				<DataTable
					table={table}
					totalPages={books?.totalPages ?? 0}
					currentPage={page}
					canLoadMore={!!books?.canLoadMore}
				/>
			</div>
		</Suspense>
	)
}

export default Parser
