'use client'
import { columns } from '@/app/admin/book/catalog/columns'
import DataTable from '@/components/catalog/data-table'
import DataTableHeader from '@/components/catalog/table-search'
import { Button } from '@/components/ui'
import { useTableParameters } from '@/hooks/useTableParameters'
import api from '@/services/api'
import { generateParameters } from '@/utils/generate-parameters'
import { secureRoutes } from '@/utils/route'
import { useQuery } from '@tanstack/react-query'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

const Page: FC = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { data: books } = useQuery({
		queryKey: ['books', searchTerm, page],
		queryFn: () => api.book.catalog(searchTerm, +page),
		select: data => data.data
	})
	const table = useReactTable({
		data: books?.data ?? [],
		columns: columns(),
		getCoreRowModel: getCoreRowModel()
	})

	return (
		<div className='w-full'>
			<DataTableHeader
				title='Books'
				defaultTerm={searchTerm}
				onSearchSubmit={term => {
					router.replace(
						generateParameters(secureRoutes.bookCatalogRoute, {
							searchTerm: term.searchTerm
						})
					)
				}}>
				<Link href={secureRoutes.bookCreateRoute}>
					<Button size='sm' variant='muted'>
						Create
					</Button>
				</Link>
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
export default Page
