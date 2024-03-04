import ActivityList from '@/components/activity-list'
import { Button } from '@/components/ui'
import { acceptToast } from '@/utils/toast'
import type { ColumnDef } from '@tanstack/react-table'
import type { CatalogUserOutput } from 'global/api-client/models/catalog-user-output'
import { getFileUrl } from 'global/api-config'
import { timeAgo } from 'global/helpers/time-format'

export const columns = ({
	remove
}: {
	remove: (id: number) => void
}): ColumnDef<CatalogUserOutput, any>[] => [
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
				<img
					alt={row.original.email}
					src={getFileUrl(row.original.picture || 'fallback.png')}
					width={50}
					height={50}
					className=' h-[60px] w-[60px] rounded-full'
				/>
				<h2 className='text-lg'>{row.original.fullName}</h2>
				<p className='text-xm'>{row.original.email}</p>
				<p className='text-xm'> {row.original.socialId}</p>
				<p>joined: {timeAgo(new Date(row.original.createdAt))}</p>
				<p>location: {row.original.location}</p>
				<Button
					size='sm'
					className='mt-1'
					variant='danger'
					onClick={() =>
						acceptToast('Are you sure you want to delete this user?', {
							action: {
								label: 'Delete',
								onClick: () => remove(row.original.id)
							}
						})
					}
				>
					Delete
				</Button>
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
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.savedBooks} Saved`}
				</Button>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.readingBooks} Reading`}
				</Button>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.finishedBooks} Finished`}
				</Button>
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
					<Button
						size='sm'
						variant='muted'
						className='m-1 w-full'
						key={genre.name}
					>
						{genre.name}
					</Button>
				))}
			</div>
		)
	}
]
