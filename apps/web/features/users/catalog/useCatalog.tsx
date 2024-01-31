import { columns } from '@/features/users/catalog/columns'
import { useQueries } from '@/features/users/catalog/useQueries'
import { useTableParameters } from '@/shared/hooks/useTableParameters'
import {
	generateParameters,
	type GenerateParametersType
} from '@/shared/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

export const userRoute = '/admin/users'
export const useCatalog = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { users, deleteUser } = useQueries({ page, searchTerm })

	const table = useReactTable({
		data: users?.data ?? [],
		columns: columns({
			//TODO: пофиксить тут
			remove: deleteUser
		}),
		getCoreRowModel: getCoreRowModel()
	})

	const pushParameters = (parameters: GenerateParametersType) =>
		router.replace(generateParameters(userRoute, parameters))

	const headerProperties = {
		defaultTerm: searchTerm,
		onSearchSubmit: (data: { searchTerm: string }) =>
			pushParameters({ searchTerm: data.searchTerm })
	}

	const tableProperties = {
		table,
		totalPages: users?.totalPages,
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
