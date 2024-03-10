import { bookRoute } from '@/app/admin/book/catalog/useCatalog'
import { columns } from '@/app/admin/parser/columns'
import { useQueries } from '@/app/admin/parser/useQueries'
import { useTableParameters } from '@/hooks/useTableParameters'
import {
	generateParameters,
	type GenerateParametersType
} from '@/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

const parserRoute = '/admin/parser'
const parserCatalogRoute = parserRoute
export const useCatalog = () => {
	const { page, searchTerm, dialog } = useTableParameters()
	const router = useRouter()
	const { books, deleteFromParser } = useQueries({
		page,
		searchTerm
	})

	const pushParameters = (parameters: GenerateParametersType) =>
		router.replace(generateParameters(parserCatalogRoute, parameters))

	const table = useReactTable({
		data: books?.data ?? [],
		columns: columns({
			remove: (id: number) => deleteFromParser(id),
			useAsTemplate: id => router.push(`${bookRoute}/create?template=${id}`)
		}),
		getCoreRowModel: getCoreRowModel()
	})

	const headerProperties = {
		defaultTerm: searchTerm,
		onSearchSubmit: (data: { searchTerm: string }) =>
			pushParameters({ searchTerm: data.searchTerm })
	}
	const tableProperties = {
		table,
		totalPages: books?.totalPages ?? 0,
		currentPage: page,
		canLoadMore: !books?.canLoadMore,
		previous: () => pushParameters({ page: page - 1 }),
		next: () => pushParameters({ page: page + 1 })
	}

	const parseButtonProperties = {
		isOpen: dialog === 'parse',
		open: () => pushParameters({ dialog: 'parse' }),
		close: () => router.replace(parserRoute)
	}

	return {
		headerProperties,
		tableProperties,
		parseButtonProperties
	}
}
