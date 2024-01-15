import { cn } from '@/utils/utils'
import * as React from 'react'

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({ className, ...properties }, reference) => (
	<div className='relative w-full overflow-auto'>
		<table
			ref={reference}
			className={cn('w-full caption-bottom text-sm', className)}
			{...properties}
		/>
	</div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
	<thead
		ref={reference}
		className={cn('border-foreground [&_tr]:border-b', className)}
		{...properties}
	/>
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
	<tbody
		ref={reference}
		className={cn('[&_tr:last-child]:border-0', className)}
		{...properties}
	/>
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
	<tfoot
		ref={reference}
		className={cn(
			'bg-shade border-t font-medium [&>tr]:last:border-b-0',
			className
		)}
		{...properties}
	/>
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...properties }, reference) => (
	<tr
		ref={reference}
		className={cn(
			'hover:bg-shade data-[state=selected]:bg-foreground  border-foreground border-b  transition-colors',
			className
		)}
		{...properties}
	/>
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
	<th
		ref={reference}
		className={cn(
			'text-gray h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
			className
		)}
		{...properties}
	/>
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
	<td
		ref={reference}
		className={cn(
			'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
			className
		)}
		{...properties}
	/>
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...properties }, reference) => (
	<caption
		ref={reference}
		className={cn('text-gray mt-4 text-sm', className)}
		{...properties}
	/>
))
TableCaption.displayName = 'TableCaption'

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
}
