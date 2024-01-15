import CreateAuthorPopup from '@/app/admin/authors/popup/create'
import type { DefaultCreateBookValuesType } from '@/app/admin/books/create/types'
import { ActionElement, columns } from '@/app/admin/parser/columns'
import { useSheetContext } from '@/providers/sheet-provider'
import { authorService } from '@/services/author/author-service'
import { parserService } from '@/services/parser/parser-services'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import * as React from 'react'

export const useParser = () => {
	const router = useRouter()
	const { showSheet, closeSheet } = useSheetContext()

	const { data: goodReadsBooks } = useQuery(['good-reads books'], () =>
		parserService.all()
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

	const table = useReactTable({
		data: goodReadsBooks ?? [],
		getPaginationRowModel: getPaginationRowModel(),
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
										} as DefaultCreateBookValuesType)
									}).toString()

								if (author) {
									router.push(
										'/admin/books/create' + '?' + searchParameters(author)
									)
								} else {
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
								}
							}}
						/>
					)
				}
			}
		],
		getCoreRowModel: getCoreRowModel()
	})

	return {
		table
	}
}
