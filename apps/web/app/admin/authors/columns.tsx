import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getFileUrl } from 'global/api-config'
import { MoreHorizontal } from 'icons'
import { useState } from 'react'
import { toast } from 'sonner'

export const columns = ({
	remove,
	update
}: {
	remove: (id: number) => Promise<void>
	update: () => void
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
					className='bottom-shade mx-auto w-[100px] rounded-xl'
					src={getFileUrl(row.original.picture)}
				/>
			)
		}
	},

	{
		id: 'name',
		header: () => <p className='text-center text-xl'>Name</p>,
		cell: ({ row }) => {
			return <h2 className='text-lg font-light'>{row.original.name}</h2>
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
		id: 'books',
		header: () => <p className='text-center text-xl'>Books</p>,
		cell: ({ row }) => {
			return (
				<div className='flex w-[250px]  gap-2 overflow-y-scroll'>
					{row.original.books.map(book => (
						<img
							width={100}
							height={100}
							key={book.picture}
							src={getFileUrl(book.picture)}
							className='mr-2 rounded-xl'
							alt={book.name}
						/>
					))}
				</div>
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
							className='bg-foreground border-vibrant rounded-xl border-2 p-2'
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem onClick={() => update()}>Edit</DropdownMenuItem>
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
