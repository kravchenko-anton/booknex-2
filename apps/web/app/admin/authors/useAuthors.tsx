import { columns } from '@/app/admin/authors/columns'
import { useQueries } from '@/app/admin/authors/useQueries'
import { generateParameters } from '@/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter, useSearchParams } from 'next/navigation'

export const useAuthors = () => {
	const router = useRouter()
	const parameters = useSearchParams()
	const searchTerm = parameters.get('searchTerm') ?? ''
	const page = +(parameters.get('page') ?? 1)
	const { authors, deleteAuthor } = useQueries({ page, searchTerm })

	const table = useReactTable({
		data: authors?.data ?? [],
		columns: columns({
			edit: null,
			remove: async id => {
				await deleteAuthor(id)
				router.refresh()
			}
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
		totalPages: authors.totalPages,
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
			disabled: !authors.canLoadMore
		}
	}
	return {
		headerProperties,
		tableProperties
	}
}
