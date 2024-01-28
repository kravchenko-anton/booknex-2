import { bookRoute } from '@/features/books/catalog/useCatalog'
import { columns } from '@/features/parser/catalog/columns'
import { useQueries } from '@/features/parser/catalog/useQueries'
import { useTableParameters } from '@/shared/hooks/useTableParameters'
import { generateParameters } from '@/shared/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

const parserRoute = '/admin/parser'

export const useCatalog = () => {
	const { page, searchTerm, dialog } = useTableParameters()
	const router = useRouter()
	const { books, deleteFromParser } = useQueries({
		page,
		searchTerm
	})

	const pushParameters = (parameters: NonNullable<unknown>) => {
		router.replace(
			generateParameters(parserRoute, {
				...parameters
			})
		)
	}

	const table = useReactTable({
		data: books?.data ?? [],
		columns: columns({
			remove: deleteFromParser,
			useAsTemplate: id => router.push(`${bookRoute}/${id}/template-create`)
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
		totalPages: books?.totalPages,
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
