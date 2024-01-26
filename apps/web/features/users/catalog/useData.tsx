import { columns } from '@/features/users/catalog/columns'
import { useQueries } from '@/features/users/catalog/useQueries'
import { useTableParameters } from '@/shared/hooks/useTableParameters'
import { generateParameters } from '@/shared/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

export const useData = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { users, deleteUser } = useQueries({ page, searchTerm })

	const table = useReactTable({
		data: users?.data ?? [],
		columns: columns({
			//TODO: пофиксить тут
			update: () => {},
			remove: deleteUser
		}),
		getCoreRowModel: getCoreRowModel()
	})

	const headerProperties = {
		defaultTerm: searchTerm,
		onSearchSubmit: data => {
			router.push(
				generateParameters('/admin/users', {
					searchTerm: data.search
				})
			)
			router.refresh()
		}
	}

	const tableProperties = {
		table,
		totalPages: users.totalPages,
		currentPage: page,
		previous: {
			onClick: () => {
				router.push(
					generateParameters('/admin/users', {
						page: page - 1
					})
				)
				router.refresh()
			}
		},
		next: {
			onClick: () => {
				router.push(
					generateParameters('/admin/users', {
						page: page + 1
					})
				)
				router.refresh()
			},
			disabled: !users.canLoadMore
		}
	}
	return {
		headerProperties,
		tableProperties
	}
}
