import { columns } from '@/features/books/catalog/columns'
import { useQueries } from '@/features/books/catalog/useQueries'
import { useTableParameters } from '@/shared/hooks/useTableParameters'
import type { GenerateParametersType } from '@/shared/utils/generate-parameters'
import { generateParameters } from '@/shared/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

export const bookRoute = '/admin/books'
export const useCatalog = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { books, deleteBook, toggleVisible } = useQueries({ page, searchTerm })

	const table = useReactTable({
		data: books?.data ?? [],
		columns: columns({
			overview: id => router.push(`${bookRoute}/${id}/overview`),
			remove: deleteBook,
			toggleVisible: toggleVisible
		}),
		getCoreRowModel: getCoreRowModel()
	})

	const pushParameters = (parameters: GenerateParametersType) =>
		router.replace(generateParameters(bookRoute, parameters))

	const headerProperties = {
		defaultTerm: searchTerm,
		onSearchSubmit: (data: { searchTerm: string }) =>
			pushParameters({ searchTerm: data.searchTerm })
	}

	const onCreateButtonClick = () => router.push('/admin/books/create')

	const tableProperties = {
		table,
		totalPages: books?.totalPages,
		currentPage: page,
		canLoadMore: !books?.canLoadMore,
		previous: () => pushParameters({ page: page - 1 }),
		next: () => pushParameters({ page: page + 1 })
	}
	return {
		onCreateButtonClick,
		headerProperties,
		tableProperties
	}
}
