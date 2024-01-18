import CreateAuthor from '@/app/admin/authors/create/create'
import { searchParameters } from '@/app/admin/parser/additional-functions'
import CallParser from '@/app/admin/parser/call-parser'
import { columns } from '@/app/admin/parser/columns'
import type { EditAndUseProperties } from '@/app/admin/parser/types'
import { useQueries } from '@/app/admin/parser/useQueries'
import { useAction, useTypedSelector } from '@/hooks'
import { useTableParameters } from '@/hooks/useTableParameters'
import { useSheetContext } from '@/providers/sheet-provider'
import { generateParameters } from '@/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

export const useData = () => {
	const { page, searchTerm } = useTableParameters()
	const router = useRouter()
	const { updateLastParsedData } = useAction()
	const { lastParsedData } = useTypedSelector(state => state.parser)
	const { showSheet, closeSheet } = useSheetContext()
	const { books, checkAuthorExist, deleteFromParser, parse, parseLoading } =
		useQueries({ page, searchTerm })
	const useAsTemplate = async (properties: EditAndUseProperties) => {
		const author = await checkAuthorExist(properties.authorName)
		if (author)
			return router.push(
				'/admin/books/create' +
					'?' +
					searchParameters(author, { ...properties })
			)
		const blob = await fetch(properties.authorPicture).then(result =>
			result.blob()
		)
		showSheet(
			<CreateAuthor
				defaultValues={{
					name: properties.authorName,
					description: properties.authorDescription,
					picture: {
						blob,
						name: `${properties.authorName}.png`
					}
				}}
				onCreate={({ id, name }) => {
					router.push(
						'/admin/books/create' +
							'?' +
							searchParameters({ id, name }, { ...properties })
					)
					closeSheet()
				}}
			/>
		)
	}

	const table = useReactTable({
		data: books.data ?? [],
		columns: columns({
			remove: deleteFromParser,
			useAsTemplate
		}),
		getCoreRowModel: getCoreRowModel()
	})

	const headerProperties = {
		defaultTerm: searchTerm,
		onSearchSubmit: data => {
			router.push(
				generateParameters('/admin/parser', {
					searchTerm: data.search
				})
			)
			router.refresh()
		}
	}

	const tableProperties = {
		table,
		totalPages: books.totalPages,
		currentPage: page,
		previous: {
			onClick: () => {
				router.push(
					generateParameters('/admin/parser', {
						page: page - 1
					})
				)
				router.refresh()
			}
		},
		next: {
			onClick: () => {
				router.push(
					generateParameters('/admin/parser', {
						page: page + 1
					})
				)
				router.refresh()
			},
			disabled: !books.canLoadMore
		}
	}

	const parseFunctions = {
		isLoading: parseLoading,
		onClick: () =>
			showSheet(
				<CallParser
					defaultValues={{
						link: lastParsedData?.url ?? '',
						page: (lastParsedData && lastParsedData.page + 1) ?? 0
					}}
					onSubmit={data => {
						parse({
							page: +data.page,
							url: data.link
						})
						updateLastParsedData({
							page: +data.page,
							url: data.link
						})
						closeSheet()
					}}
				/>
			)
	}

	return {
		headerProperties,
		tableProperties,
		parseFunctions
	}
}
