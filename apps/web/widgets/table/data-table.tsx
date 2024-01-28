import { columns } from '@/features/parser/catalog/columns'
import { Button } from '@/shared/ui'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/shared/ui/table'
import type { useReactTable } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import type { FC } from 'react'
import * as React from 'react'

export interface DataTableProperties {
	table: ReturnType<typeof useReactTable<any>>
	totalPages: number
	currentPage: number
	previous: () => void
	next: () => void
	canLoadMore?: boolean
}
const DataTable: FC<DataTableProperties> = ({
	next,
	currentPage,
	previous,
	table,
	canLoadMore,
	totalPages
}) => {
	return (
		<div>
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
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='text-muted-foreground flex-1 text-sm'>
					{currentPage} page of {totalPages} pages
				</div>
				<div className='flex space-x-2'>
					<Button
						size='sm'
						variant='secondary'
						onClick={previous}
						disabled={!!(typeof currentPage !== 'number' || currentPage < 1)}
					>
						Previous
					</Button>
					<Button size='sm' onClick={next} disabled={canLoadMore}>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}

export default DataTable
