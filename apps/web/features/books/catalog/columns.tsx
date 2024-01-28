import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { getFileUrl } from 'global/api-config'
import { nFormatter } from 'global/utils/number-formater'
import { MoreHorizontal } from 'icons'
import { useState } from 'react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export const columns = ({
	remove,
	update,
	toggleVisible,
	overview
}: {
	remove: (id: number) => void
	update: (id: number) => void
	overview: (id: number) => void
	toggleVisible: (id: number) => void
}) => [
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
					className=' mx-auto w-[100px] rounded-xl'
					src={getFileUrl(row.original.picture)}
				/>
			)
		}
	},
	{
		id: 'Information',
		header: () => <p className='text-center text-xl'>Information</p>,
		cell: ({ row }) => {
			return (
				<div className='w-[210px]'>
					<h3 className='mb-1 text-xl'>{row.original.title}</h3>
					<p>{row.original.author}</p>
					<div className='flex flex-wrap gap-2'>
						<p className='bg-foreground mt-2 rounded-xl p-1 font-light'>
							<b className='font-bold text-white'>{row.original.pages}</b> pages
						</p>
						<p className='bg-foreground mt-2 rounded-xl p-1 font-light'>
							<b className='font-bold text-white'>
								{nFormatter(row.original.popularity)}{' '}
							</b>{' '}
							popularity
						</p>
					</div>
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
						: row.original.description.slice(0, 250) + '...'}
				</p>
			)
		}
	},
	{
		id: 'genres',
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => {
			return (
				<div className='flex w-[300px] flex-wrap items-center justify-center'>
					{row.original.genres.map(genre => (
						<p
							className='bg-foreground border-muted m-1 rounded-xl border-2 p-1.5  text-sm text-white'
							key={genre.name}
						>
							{genre.name}
						</p>
					))}
				</div>
			)
		}
	},
	{
		id: 'Visible',
		header: () => <p className='text-center text-xl'>Visible</p>,
		cell: ({ row }) => {
			return (
				<p
					className={twMerge(
						'text-md rounded-xl p-1 text-center text-white',
						row.original.visible ? 'bg-success' : 'bg-danger'
					)}
				>
					{row.original.visible ? 'Yes' : 'No'}
				</p>
			)
		}
	},
	{
		id: 'Actions',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger className='focus-visible:outline-0'>
						<MoreHorizontal
							height={40}
							width={40}
							className='bg-foreground border-muted rounded-xl border-2 p-2'
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem onClick={() => overview(row.original.id)}>
							Overview
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => toggleVisible(row.original.id)}>
							Toggle Visibility
						</DropdownMenuItem>
						<DropdownMenuSeparator />

						<DropdownMenuItem onClick={() => update(row.original.id)}>
							Edit
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
	}
]
