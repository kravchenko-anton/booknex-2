'use client'

import { _columns } from '@/app/admin/user/catalog/_columns'
import { _useQueries } from '@/app/admin/user/catalog/_useQueries'
import DataTable from '@/components/catalog/data-table'
import DataTableHeader from '@/components/catalog/table-search'
import Loader from '@/components/ui/loader/loader'
import { useTableParameters } from '@/hooks/useTableParameters'
import { generateParameters } from '@/utils/generate-parameters'
import { secureRoutes } from '@/utils/route'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { Suspense, type FC } from 'react'

const Page: FC = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { users, deleteUser, deleteUserLoading } = _useQueries({
		page,
		searchTerm
	})

	const table = useReactTable({
		data: users?.data ?? [],
		columns: _columns({
			remove: deleteUser,
			removeLoading: deleteUserLoading
		}),
		getCoreRowModel: getCoreRowModel()
	})
	return (
		<Suspense fallback={<Loader />}>
			<div className='w-full'>
				<DataTableHeader
					title='Users'
					defaultTerm={searchTerm}
					onSearchSubmit={term => {
						router.replace(
							generateParameters(secureRoutes.userCatalogRoute, {
								searchTerm: term.searchTerm
							})
						)
					}}
				/>
				<DataTable
					currentPage={page}
					totalPages={Number(users?.totalPages)}
					canLoadMore={users?.canLoadMore}
					table={table}
				/>
			</div>
		</Suspense>
	)
}

export default Page
