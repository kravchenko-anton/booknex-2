import { columns } from '@/features/books/catalog/columns'
import { useTableParameters } from '@/hooks/useTableParameters'
import api from '@/services'
import {
	generateParameters,
	type GenerateParametersType
} from '@/utils/generate-parameters'
import { useQuery } from '@tanstack/react-query'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

export const bookRoute = '/admin/books'
export const useCatalog = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { data: books } = useQuery({
		queryKey: ['books', searchTerm, page],
		queryFn: () => api.book.all(searchTerm, +page)
	})
	const table = useReactTable({
		data: books?.data ?? [],
		columns: columns({
			preview: id => router.push(`/admin/books/${id}/overview`)
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
		totalPages: books?.totalPages ?? 0,
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
