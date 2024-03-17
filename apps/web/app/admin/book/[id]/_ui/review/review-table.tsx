import { reviewColumns } from '@/app/admin/book/[id]/_ui/review/review-columns'
import { columns } from '@/app/admin/book/catalog/columns'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import {
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table'
import type { AdminInfoByIdOutput } from 'global/api-client'
import type { FC } from 'react'
import * as React from 'react'

interface ReviewTableProperties {
	review: AdminInfoByIdOutput['review']
}

const ReviewTable: FC<ReviewTableProperties> = ({ review }) => {
	const table = useReactTable({
		data: review ?? [],
		columns: reviewColumns(),
		getCoreRowModel: getCoreRowModel()
	})
	return (
		<div className='mt-4'>
			<h1 className='mb-2 text-xl'>Review</h1>
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

export default ReviewTable
