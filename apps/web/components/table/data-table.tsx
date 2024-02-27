import { columns } from '@/app/admin/parser/_catalog/columns'
import { Button } from '@/components/ui'
import Loader from '@/components/ui/loader/loader'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import type { useReactTable } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import type { FunctionType } from 'global/types'
import type { FC } from 'react'
import * as React from 'react'

export interface DataTableProperties {
	table: ReturnType<typeof useReactTable<any>>
	totalPages: number
	currentPage: number
	previous: FunctionType
	next: FunctionType
	canLoadMore?: boolean
}
const DataTable: FC<DataTableProperties> = ({
	next,
	currentPage,
	previous,
	table,
	canLoadMore,
	totalPages
}) => (
	<div>
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map(headerGroup => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<TableHead key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
							</TableHead>
						))}
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
						<TableCell
							colSpan={columns.length}
							className='flex h-24 items-center gap-5 text-center'
						>
							<Loader width={30} height={30} />
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
					variant='primary'
					disabled={currentPage < 1}
					onClick={previous}
				>
					Previous
				</Button>
				<Button size='sm' disabled={canLoadMore} onClick={next}>
					Next
				</Button>
			</div>
		</div>
	</div>
)

export default DataTable
