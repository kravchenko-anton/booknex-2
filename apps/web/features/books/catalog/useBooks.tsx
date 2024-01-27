import { columns } from '@/features/books/catalog/columns'
import { useQueries } from '@/features/books/catalog/useQueries'
import { useTableParameters } from '@/shared/hooks/useTableParameters'
import { generateParameters } from '@/shared/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

export const useBooks = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { books, deleteBook, toggleVisible } = useQueries({ page, searchTerm })

	const table = useReactTable({
		data: books?.data ?? [],
		columns: columns({
			overview: id => router.push(`admin/books/${id}/overview`),
			update: id => router.push(`admin/books/${id}/update`),
			remove: deleteBook,
			toggleVisible: toggleVisible
		}),
		getCoreRowModel: getCoreRowModel()
	})

	const headerProperties = {
		defaultTerm: searchTerm,
		onSearchSubmit: data => {
			router.push(
				generateParameters('/admin/books', {
					searchTerm: data.search
				})
			)
			router.refresh()
		}
	}

	const onCreateButtonClick = () => router.push('/admin/books/create')

	const tableProperties = {
		table,
		totalPages: books?.totalPages,
		currentPage: page,
		previous: {
			onClick: () => {
				router.push(
					generateParameters('/admin/books', {
						page: page - 1
					})
				)
				router.refresh()
			}
		},
		next: {
			onClick: () => {
				router.push(
					generateParameters('/admin/books', {
						page: page + 1
					})
				)
				router.refresh()
			},
			disabled: !books?.canLoadMore
		}
	}
	return {
		onCreateButtonClick,
		headerProperties,
		tableProperties
	}
}
