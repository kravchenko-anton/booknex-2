import { columns } from '@/features/author/catalog/columns'
import { useQueries } from '@/features/author/catalog/useQueries'
import { useTableParameters } from '@/shared/hooks/useTableParameters'
import { generateParameters } from '@/shared/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

export const useData = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { authors, deleteAuthor } = useQueries({ page, searchTerm })

	const table = useReactTable({
		data: authors?.data ?? [],
		columns: columns({
			//TODO: сделать эдит автора
			update: null,
			remove: id => deleteAuthor(id)
		}),
		getCoreRowModel: getCoreRowModel()
	})

	const headerProperties = {
		defaultTerm: searchTerm,
		onSearchSubmit: data => {
			router.push(
				generateParameters('/admin/authors', {
					searchTerm: data.search
				})
			)
			router.refresh()
		}
	}

	const tableProperties = {
		table,
		totalPages: authors?.totalPages,
		currentPage: page,
		previous: {
			onClick: () => {
				router.push(
					generateParameters('/admin/authors', {
						page: page - 1
					})
				)
				router.refresh()
			}
		},
		next: {
			onClick: () => {
				router.push(
					generateParameters('/admin/authors', {
						page: page + 1
					})
				)
				router.refresh()
			},
			disabled: !authors?.canLoadMore
		}
	}
	return {
		headerProperties,
		tableProperties
	}
}
