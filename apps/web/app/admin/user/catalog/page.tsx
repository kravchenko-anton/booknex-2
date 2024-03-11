'use client'

import { userCatalogRoute } from '@/app/admin/book/_shared/route-names'
import { columns } from '@/app/admin/user/catalog/columns'
import { useQueries } from '@/app/admin/user/catalog/useQueries'
import DataTable from '@/components/catalog/data-table'
import DataTableHeader from '@/components/catalog/table-search'
import { useTableParameters } from '@/hooks/useTableParameters'
import { generateParameters } from '@/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

const Page: FC = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { users, deleteUser } = useQueries({ page, searchTerm })

	const table = useReactTable({
		data: users?.data ?? [],
		columns: columns({
			remove: deleteUser
		}),
		getCoreRowModel: getCoreRowModel()
	})
	return (
		<div className='w-full'>
			<DataTableHeader
				title='Users'
				defaultTerm={searchTerm}
				onSearchSubmit={term => {
					router.replace(
						generateParameters(userCatalogRoute, {
							searchTerm: term.searchTerm
						})
					)
				}}
			/>
			<DataTable
				table={table}
				totalPages={users?.totalPages ?? 0}
				currentPage={page}
				canLoadMore={users?.canLoadMore}
			/>
		</div>
	)
}

export default Page
