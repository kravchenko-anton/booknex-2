import CreateAuthorPopup from '@/app/admin/authors/popup/create'
import CallParse from '@/app/admin/parser/call-parse'
import { ActionElement, columns } from '@/app/admin/parser/columns'
import { SheetHeader } from '@/components/ui/sheet'
import { useAction, useTypedSelector } from '@/hooks'
import { useSheetContext } from '@/providers/sheet-provider'
import { authorService } from '@/services/author/author-service'
import { parserService } from '@/services/parser/parser-services'
import { generateParameters } from '@/utils/generate-parameters'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ParserDtoPayload } from 'global/services-types/parser-types'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'

export const useParser = () => {
	const router = useRouter()
	const { updateLastParsedData } = useAction()
	const { lastParsedData } = useTypedSelector(state => state.parser)
	const parameters = useSearchParams()
	const { showSheet, closeSheet } = useSheetContext()
	const { data: books } = useQuery(
		['good-reads books', parameters.get('searchTerm'), parameters.get('page')],
		() =>
			parserService.all({
				searchTerm: parameters.get('searchTerm'),
				page: +parameters.get('page')
			})
	)
	const { mutateAsync: checkAuthorExist } = useMutation(
		['check author exist'],
		(name: string) => authorService.exist(name)
	)
	const { mutateAsync: deleteFromParser } = useMutation(
		['delete from parser'],
		(id: number) => parserService.delete(id),
		{
			onSuccess: () => {
				successToast('Book deleted')
				router.refresh()
			}
		}
	)
	const { mutateAsync: parse, isLoading: parseLoading } = useMutation(
		['parse good-reads books'],
		(dto: ParserDtoPayload) => parserService.parse(dto),
		{
			onSuccess: () => {
				toast.loading('Books parsed')
			}
		}
	)

	const table = useReactTable({
		data: books?.data ?? [],
		columns: [
			...columns,
			{
				id: 'Actions',
				cell: ({ row }) => {
					return (
						<ActionElement
							onDelete={() => deleteFromParser(row.original.id)}
							onEdit={async () => {
								const blob = await fetch(row.original.authorPicture).then(
									result => result.blob()
								)
								const author = await checkAuthorExist(row.original.authorName)
								const searchParameters = (author: {
									id: number
									name: string
								}) =>
									new URLSearchParams({
										defaultValues: JSON.stringify({
											author: {
												id: author.id,
												name: author.name
											},
											title: row.original.title,
											description: row.original.description,
											pages: row.original.pages,
											popularity: row.original.popularity,
											genres: row.original.genres
										})
									}).toString()

								if (author)
									router.push(
										'/admin/books/create' + '?' + searchParameters(author)
									)
								showSheet(
									<CreateAuthorPopup
										defaultValues={{
											name: row.original.authorName,
											description: row.original.authorDescription,
											picture: {
												blob,
												name: `${row.original.authorName}.png`
											}
										}}
										onCreate={({ id, name }) => {
											router.push(
												'/admin/books/create' +
													'?' +
													searchParameters({ id, name })
											)
											closeSheet()
										}}
									/>
								)
							}}
						/>
					)
				}
			}
		],
		getCoreRowModel: getCoreRowModel()
	})
	console.log(books?.canLoadMore, 'canLoadMore')
	return {
		onSearchSubmit: data => {
			router.push(
				generateParameters('/admin/parser', {
					searchTerm: data.search
				})
			)
			router.refresh()
		},
		tableProperties: {
			table,
			totalPages: books?.totalPages,
			currentPage: +parameters.get('page') ?? 1,
			previous: {
				onClick: () => {
					router.push(
						generateParameters('/admin/parser', {
							page: +(parameters.get('page') ?? 1) - 1
						})
					)
					router.refresh()
				}
			},
			next: {
				onClick: () => {
					router.push(
						generateParameters('/admin/parser', {
							page: +(parameters.get('page') ?? 1) + 1
						})
					)
					router.refresh()
				},
				disabled: !books?.canLoadMore
			}
		},
		parse: {
			isLoading: parseLoading,
			onClick: () => {
				showSheet(
					<div>
						<SheetHeader>
							<h1 className='text-3xl font-medium'>Parse </h1>
						</SheetHeader>
						<CallParse
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
					</div>
				)
			}
		}
	}
}
