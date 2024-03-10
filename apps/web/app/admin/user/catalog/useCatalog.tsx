import { columns } from '@/app/admin/user/catalog/columns'
import { useQueries } from '@/app/admin/user/catalog/useQueries'
import { useTableParameters } from '@/hooks/useTableParameters'
import {
	generateParameters,
	type GenerateParametersType
} from '@/utils/generate-parameters'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

export const userRoute = '/admin/user'
export const userCatalogRoute = userRoute + '/catalog'
export const useCatalog = () => {
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

	const pushParameters = (parameters: GenerateParametersType) =>
		router.replace(generateParameters(userCatalogRoute, parameters))

	const headerProperties = {
		defaultTerm: searchTerm,
		onSearchSubmit: (data: { searchTerm: string }) =>
			pushParameters({ searchTerm: data.searchTerm })
	}

	const tableProperties = {
		table,
		totalPages: users?.totalPages ?? 0,
		currentPage: page,
		previous: () => pushParameters({ page: page - 1 }),
		next: () => pushParameters({ page: page + 1 }),
		canLoadMore: !users?.canLoadMore
	}
	return {
		headerProperties,
		tableProperties
	}
}
