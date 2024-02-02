import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import type { ColumnDef } from '@tanstack/react-table'
import { getFileUrl } from 'global/api-config'
import { nFormatter } from 'global/utils/number-formater'
import { MoreHorizontal } from 'icons'
import * as React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

type ColumnType = ColumnDef<{
	id: number
	title: string
	author: string
	picture: string
	description: string
	pages: number
	popularity: number
	genres: { name: string }[]
}>[]

export const columns = ({
	remove,
	useAsTemplate
}: {
	remove: (id: number) => Promise<null>
	useAsTemplate: (id: number) => void
}): ColumnType => [
	{
		id: 'id',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>id</p>,
		cell: ({ row }) => <p className='text-2xl'>{row.original.id}</p>
	},
	{
		id: 'picture',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Picture</p>,
		cell: ({ row }) => (
			<img
				alt={row.original.title}
				className=' mx-auto w-[100px] rounded-xl'
				src={getFileUrl(row.original.picture)}
			/>
		)
	},
	{
		id: 'Information',
		header: () => <p className='text-center text-xl'>Information</p>,
		cell: ({ row }) => (
			<div className='w-[250px]'>
				<h3 className='text-xl'>{row.original.title}</h3>
				<p>{row.original.author}</p>
				<div className='flex flex-wrap gap-2'>
					<p className='bg-foreground mt-2 rounded-xl p-1.5 font-light'>
						<b className='font-bold text-white'>{row.original.pages}</b> pages
					</p>
					<p className='bg-foreground mt-2 rounded-xl p-1.5 font-light'>
						<b className='font-bold text-white'>
							{nFormatter(row.original.popularity)}{' '}
						</b>{' '}
						popularity
					</p>
				</div>
			</div>
		)
	},
	{
		id: 'description',
		header: () => <p className='text-center text-xl'>Description</p>,
		cell: ({ row }) => {
			const [showMore, setShowMore] = useState(false)
			return (
				<button className='mb-2 text-sm' onClick={() => setShowMore(!showMore)}>
					{showMore
						? row.original.description
						: row.original.description.slice(0, 250) + '...'}
				</button>
			)
		}
	},
	{
		id: 'genres',
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => (
			<div className='flex  w-[300px] flex-wrap items-center justify-center'>
				{row.original.genres.map(genre => (
					<p
						className='bg-foreground border-muted m-1 rounded-xl border-2 p-2  text-sm text-white'
						key={genre.name}
					>
						{genre.name}
					</p>
				))}
			</div>
		)
	},
	{
		id: 'Actions',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger className='focus-visible:outline-0'>
					<MoreHorizontal
						height={40}
						width={40}
						className='bg-foreground border-muted rounded-xl border-2 p-2'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						onClick={() => {
							useAsTemplate(row.original.id)
						}}
					>
						Use as template
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() =>
							toast('Are you sure you want to delete this book?', {
								action: {
									label: 'Delete',
									onClick: () => remove(row.original.id)
								}
							})
						}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
