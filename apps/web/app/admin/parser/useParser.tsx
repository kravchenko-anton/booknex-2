import CreateAuthor from '@/app/admin/authors/create/create'
import { searchParameters } from '@/app/admin/parser/additional-functions'
import CallParser from '@/app/admin/parser/call-parser'
import { columns } from '@/app/admin/parser/columns'
import type { EditAndUseProperties } from '@/app/admin/parser/types'
import { useQueries } from '@/app/admin/parser/useQueries'
import { useAction, useTypedSelector } from '@/hooks'
import { useSheetContext } from '@/providers/sheet-provider'
import { generateParameters } from '@/utils/generate-parameters'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter, useSearchParams } from 'next/navigation'

export const useParser = () => {
	//TODO: оптимизнуть этот хук на сколько это возможно
	const router = useRouter()
	const { updateLastParsedData } = useAction()
	const { lastParsedData } = useTypedSelector(state => state.parser)
	const parameters = useSearchParams()
	const { showSheet, closeSheet } = useSheetContext()
	//TODO: вынести парсинг даты в отдельный хук
	const searchTerm = parameters.get('searchTerm') ?? ''
	const page = +(parameters.get('page') ?? 1)
	const { books, checkAuthorExist, deleteFromParser, parse, parseLoading } =
		useQueries({ page, searchTerm })
	const editAndUse = async (properties: EditAndUseProperties) => {
		const blob = await fetch(properties.authorPicture).then(result =>
			result.blob()
		)
		const author = await checkAuthorExist(properties.authorName)
		//Вынести эту функцию но сделать так чтобы я передавал фунуцию если автора нету и там в параметрах будет createAuthor
		if (author)
			router.push(
				'/admin/books/create' +
					'?' +
					searchParameters(author, { ...properties })
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
			deleteFromParser: async id => {
				await deleteFromParser(id)
				router.refresh()
			},
			editAndUse: editAndUse
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
