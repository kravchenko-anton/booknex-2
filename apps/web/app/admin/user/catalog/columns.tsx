import ActivityList from '@/components/activity-list'
import { Button } from '@/components/ui'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { acceptToast, infoToast } from '@/utils/toast'
import type { ColumnDef } from '@tanstack/react-table'
import type { CatalogUserOutput } from 'global/api-client/models/catalog-user-output'
import { getFileUrl } from 'global/api-config'
import { timeAgo } from 'global/helpers/time-format'
import { MoreHorizontal } from 'icons'

export const columns = ({
	remove,
	removeLoading
}: {
	remove: (id: number) => void
	removeLoading: boolean
}): ColumnDef<CatalogUserOutput, unknown>[] => [
	{
		id: 'id',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>id</p>,
		cell: ({ row }) => <p className='text-center text-2xl'>{row.original.id}</p>
	},
	{
		id: 'picture',
		header: () => <p className='text-center text-lg'>Picture</p>,
		enableHiding: false,
		cell: ({ row }) => (
			<img
				alt={row.original.email}
				src={getFileUrl(row.original.picture || 'fallback.png')}
				width={50}
				height={50}
				className=' mx-auto h-[60px] w-[60px] rounded-md'
			/>
		)
	},
	{
		id: 'Bio',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Info</p>,
		cell: ({ row }) => (
			<div className=' gap-4'>
				<h2 className='text-lg'>{row.original.fullName}</h2>
				<p className='text-xm'>{row.original.email}</p>
				<p className='text-xm'> {row.original.socialId}</p>
				<p>joined: {timeAgo(new Date(row.original.createdAt))}</p>
				<p>
					location: <b className='font-bold'> {row.original.location}</b>
				</p>
			</div>
		)
	},

	{
		id: 'Activities',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Activities</p>,
		cell: ({ row }) => <ActivityList onlyGraph data={row.original.activities} />
	},

	{
		id: 'Library',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Library</p>,
		cell: ({ row }) => (
			<div className=' max-w-[80px] items-center justify-center  gap-2'>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.savedBooks} Saved`}
				</Button>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.readingBooks} Read`}
				</Button>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.finishedBooks} Finish`}
				</Button>
			</div>
		)
	},
	{
		id: 'genres',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => (
			<div className=' max-w-[110px] items-center justify-center gap-1'>
				{row.original.selectedGenres.map(genre => (
					<Button
						size='sm'
						variant='muted'
						className='mb-2 w-full'
						key={genre.slug}>
						{genre.name}
					</Button>
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
						className='bg-muted border-bordered rounded border-[1px] p-2'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						onClick={() =>
							acceptToast('Are you sure you want to delete this book?', {
								action: {
									label: 'Delete',
									onClick: () => {
										if (removeLoading) return infoToast('Please wait')
										remove(row.original.id)
									}
								}
							})
						}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
