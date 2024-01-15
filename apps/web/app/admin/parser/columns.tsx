import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { ColumnDef } from '@tanstack/react-table'
import { getFileUrl } from 'global/api-config'
import { nFormatter } from 'global/utils/number-formater'
import { MoreHorizontal } from 'icons'
import * as React from 'react'
import { useState } from 'react'

export const columns: ColumnDef<{
	id: number
	title: string
	description: string
	pages: number
	popularity: number
	genres: { name: string }[]
	authorName: string
	authorDescription: string
	authorPicture: string
	picture: string
}>[] = [
	{
		id: 'id',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>id</p>,
		cell: ({ row }) => {
			return <p className='text-2xl'>{row.original.id}</p>
		}
	},
	{
		id: 'picture',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Picture</p>,
		cell: ({ row }) => {
			return (
				<img
					alt={row.original.title}
					className='bottom-shade mx-auto w-[100px] rounded-xl'
					src={getFileUrl(row.original.picture)}
				/>
			)
		}
	},
	{
		id: 'bio',
		header: () => <p className='text-center text-xl'>Bio</p>,
		cell: ({ row }) => {
			return (
				<div>
					<h3 className='text-lg'>{row.original.title}</h3>
					<div className='mt-2 flex items-center gap-2'>
						<img
							width={45}
							height={45}
							className='rounded-full'
							src={row.original.authorPicture}
							alt={row.original.authorName}
						/>
						<p className=' mb-1 text-lg'>{row.original.authorName}</p>
					</div>
				</div>
			)
		}
	},
	{
		id: 'info',
		header: () => <p className='text-center text-xl'>Info</p>,
		cell: ({ row }) => {
			return (
				<div className='w-[120px]'>
					<h2 className='text-lg font-light'>
						Pages: <b className='font-bold'>{row.original.pages}</b>
					</h2>
					<h2 className='mt-2 text-lg font-light'>
						Popularity:{' '}
						<b className='font-bold'>{nFormatter(row.original.popularity)}</b>
					</h2>
				</div>
			)
		}
	},
	{
		id: 'description',
		header: () => <p className='text-center text-xl'>Description</p>,
		cell: ({ row }) => {
			const [showMore, setShowMore] = useState(false)
			return (
				<p className='mb-2 text-sm' onClick={() => setShowMore(!showMore)}>
					{showMore
						? row.original.description
						: row.original.description.slice(0, 500) + '...'}
				</p>
			)
		}
	},
	{
		id: 'genres',
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => {
			return (
				<div className='flex  w-[200px] flex-wrap items-center'>
					{row.original.genres.map(genre => (
						<p
							className='bg-foreground border-vibrant m-1 rounded-xl border-2 p-2  text-sm text-white'
							key={genre.name}
						>
							{genre.name}
						</p>
					))}
				</div>
			)
		}
	}
]

export const ActionElement = ({
	onDelete,
	onEdit
}: {
	onDelete: () => void
	onEdit: () => void
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='focus-visible:outline-0'>
				<MoreHorizontal
					height={40}
					width={40}
					className='bg-foreground border-vibrant rounded-xl border-2 p-2'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
