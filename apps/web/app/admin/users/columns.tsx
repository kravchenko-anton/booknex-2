import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { nFormatter } from 'global/utils/number-formater'
import { MoreHorizontal } from 'icons'

export const columns = ({
	remove,
	update
}: {
	remove: (id: number) => void
	update: (id: number) => void
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
		id: 'Email',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Email</p>,
		cell: ({ row }) => {
			return <h3 className='mb-1 w-[200px] text-xl'>{row.original.email}</h3>
		}
	},
	{
		id: 'Statistics',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Activities</p>,
		cell: ({ row }) => {
			return (
				<div className='flex flex-wrap items-center justify-center gap-4'>
					<h2 className='bg-foreground border-vibrant mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
						{nFormatter(row.original._count.activity)} Activities
					</h2>
					<h2 className='bg-foreground border-vibrant mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
						{row.original._count.savedBooks} Saved Books
					</h2>
					<h2 className='bg-foreground border-vibrant mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
						{row.original._count.readingBooks} Reading Books
					</h2>
					<h2 className='bg-foreground border-vibrant mt-2 rounded-xl border-2 p-1.5 text-center font-light'>
						{row.original._count.finishedBooks} Finished Books
					</h2>
				</div>
			)
		}
	},
	{
		id: 'Selected genres',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Selected genres</p>,
		cell: ({ row }) => {
			return (
				<div className='flex flex-wrap items-center justify-center gap-2'>
					{row.original.selectedGenres.map((genre: { name: string }) => (
						<p className='bg-foreground border-vibrant mt-2 rounded-xl border-2 p-1.5 font-light'>
							<b className='font-bold text-white'>{genre.name}</b>
						</p>
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
						<DropdownMenuItem onClick={() => update(row.original.id)}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => remove(row.original.id)}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]
