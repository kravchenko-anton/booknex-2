import ActivityList from '@/features/books/shared/activity-list'
import type { ColumnDef } from '@tanstack/react-table'
import type { ActivitiesOutput } from 'backend/src/utils/activity-transformer'
import { getFileUrl } from 'global/api-config'
import { timeAgo } from 'global/utils/time-format'
import Image from 'next/image'
import * as React from 'react'
import { toast } from 'sonner'

type ColumnType = ColumnDef<{
	id: number
	fullName: string
	email: string
	selectedGenres: { name: string }[]
	_count: {
		savedBooks: number
		finishedBooks: number
		readingBooks: number
	}
	activities: ActivitiesOutput[]
	role: string
	createdAt: Date
	location: string
	picture: string
	socialId: string
}>[]
export const columns = ({
	remove
}: {
	remove: (id: number) => void
}): ColumnType => [
	{
		id: 'id',
		enableHiding: false,
		header: () => <p className='text-center  text-xl'>id</p>,
		cell: ({ row }) => <p className='text-center text-2xl'>{row.original.id}</p>
	},

	{
		id: 'Bio',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Info</p>,
		cell: ({ row }) => (
			<div className=' gap-4'>
				<Image
					alt={row.original.email}
					src={getFileUrl(row.original.picture || 'fallback.png')}
					width={100}
					height={100}
					className='mt-2 h-[60px] w-[60px] rounded-full'
				/>
				<h2 className='text-lg'>{row.original.fullName}</h2>
				<p className='text-md'>{row.original.email}</p>
				<p> {row.original.socialId}</p>

				<button
					className='bg-danger mt-1 rounded-md p-1 text-white'
					onClick={() =>
						toast('Are you sure you want to delete this user?', {
							action: {
								label: 'Delete',
								onClick: () => remove(row.original.id)
							}
						})
					}
				>
					Delete
				</button>
			</div>
		)
	},
	{
		id: 'Activities',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Activities</p>,
		cell: ({ row }) => <ActivityList data={row.original.activities} />
	},
	{
		id: 'Library',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Library</p>,
		cell: ({ row }) => (
			<div className=' items-center justify-center  gap-2'>
				<h2 className='bg-foreground border-muted mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
					{row.original._count.savedBooks} Saved Books
				</h2>
				<h2 className='bg-foreground border-muted mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
					{row.original._count.readingBooks} Reading Books
				</h2>
				<h2 className='bg-foreground border-muted mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
					{row.original._count.finishedBooks} Finished Books
				</h2>
			</div>
		)
	},
	{
		id: 'Genres',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => (
			<div className='gap-2'>
				{row.original.selectedGenres.map(genre => (
					<h2
						className='bg-foreground border-muted mt-2 rounded-xl border-2 p-1.5 text-center font-light'
						key={genre.name}
					>
						{genre.name}
					</h2>
				))}
			</div>
		)
	},
	{
		id: 'Statistics',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Statistics</p>,
		cell: ({ row }) => (
			<div className=' items-center justify-center gap-2'>
				<h2 className='bg-foreground border-muted mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
					joined: {timeAgo(new Date(row.original.createdAt))}
				</h2>
				<h2 className='bg-foreground border-muted mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
					location: {row.original.location}
				</h2>
				<h2 className='bg-foreground border-muted mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
					role: {row.original.role}
				</h2>
			</div>
		)
	}
]
