import { Button } from '@/components/ui'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/utils'
import type { ColumnDef } from '@tanstack/react-table'
import type { Book } from 'global/api-client'
import { getFileUrl } from 'global/api-config'
import { nFormatter } from 'global/helpers/number-formater'
import Image from 'next/image'

export const columns = ({
	preview
}: {
	preview: (id: number) => void
}): ColumnDef<Book, any>[] => [
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
			<Image
				alt={row.original.title}
				className=' mx-auto w-[100px] cursor-pointer rounded-xl'
				src={getFileUrl(row.original.picture)}
				width={200}
				height={250}
				onClick={() => preview(row.original.id)}
			/>
		)
	},
	{
		id: 'Information',
		header: () => <p className='text-center text-xl'>Information</p>,
		cell: ({ row }) => (
			<button
				className='items-start justify-start text-left'
				onClick={() => preview(row.original.id)}
			>
				<h3 className='mb-1 text-xl'>{row.original.title}</h3>
				<p>{row.original.author}</p>
			</button>
		)
	},

	{
		id: 'description',
		header: () => <p className='text-center text-xl'>Description</p>,
		cell: ({ row }) => (
			<Drawer>
				<DrawerTrigger asChild>
					<p className='line-clamp-3'>{row.original.description}</p>
				</DrawerTrigger>
				<DrawerContent>
					<span className='p-6 pb-10 text-justify text-xl'>
						{row.original.description}
					</span>
				</DrawerContent>
			</Drawer>
		)
	},
	{
		id: 'genres',
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => (
			<div className='flex w-[200px]  flex-wrap items-center gap-1'>
				{row.original.genres.map(genre => (
					<Button size='sm' variant='muted' key={genre.name}>
						{genre.name}
					</Button>
				))}
			</div>
		)
	},
	{
		id: 'statistic',
		header: () => <p className='text-center text-xl'>Statistic</p>,
		cell: ({ row }) => (
			<div className='flex w-[130px] flex-wrap gap-2'>
				<div className='mt-2 gap-2 text-center'>
					<p className='bg-muted mb-2 rounded-md p-1.5 font-light'>
						<b
							className={cn(
								'font-bold',
								row.original.visible ? 'text-success' : 'text-danger'
							)}
						>
							{row.original.visible ? 'Visible' : 'Hidden'}
						</b>
					</p>
					<p className='bg-muted mb-2 rounded-md p-1.5 font-light'>
						<b className='font-bold text-white'>{row.original.pages}</b> pages
					</p>
					<p className='bg-muted rounded-md p-1.5 font-light'>
						<b className='font-bold text-white'>
							{nFormatter(row.original.popularity)}{' '}
						</b>{' '}
						popularity
					</p>
				</div>
			</div>
		)
	}
]
