import { columns } from '@/features/parser/catalog/columns'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/shared/ui/table'
import { flexRender } from '@tanstack/react-table'
import * as React from 'react'

const FeedbackTable = () => {
	return (
		<div className='mt-4 w-full'>
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
