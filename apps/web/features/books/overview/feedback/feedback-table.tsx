import { feedbackColumns } from '@/features/books/overview/feedback/feedback-columns'
import { columns } from '@/features/parser/catalog/columns'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/shared/ui/table'
import {
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table'
import type { InfoByIdAdmin } from 'global/services-types/book-types'
import type { FC } from 'react'
import * as React from 'react'

interface FeedbackTableProperties {
	feedback: InfoByIdAdmin['feedback']
}

const FeedbackTable: FC<FeedbackTableProperties> = ({ feedback }) => {
	const table = useReactTable({
		data: feedback ?? [],
		columns: feedbackColumns(),
		getCoreRowModel: getCoreRowModel()
	})
	return (
		<div className='mt-4 '>
			<h1 className='mb-2 text-xl'>Feedback</h1>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, {
											...cell.getContext()
										})}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}

export default FeedbackTable
