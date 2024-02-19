import { cn } from '@/utils'
import type { ColumnDef } from '@tanstack/react-table'
import { getFileUrl } from 'global/api-config'
import { nFormatter } from 'global/utils/number-formater'
import Image from 'next/image'
import { useState } from 'react'

type ColumnType = ColumnDef<{
	id: number
	title: string
	author: string
	picture: string
	description: string
	visible: boolean
	pages: number
	popularity: number
	genres: { name: string }[]
}>[]

export const columns = ({
	preview
}: {
	preview: (id: number) => void
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
				className=' items-start justify-start text-left'
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
		cell: ({ row }) => {
			const [showMore, setShowMore] = useState(false)
			return (
				<button
					className='mb-2 text-justify'
					onClick={() => setShowMore(!showMore)}
				>
					{showMore
						? row.original.description
						: row.original.description.slice(0, 400) + '...'}
				</button>
			)
		}
	},
	{
		id: 'genres',
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => (
			<div className='flex w-[140px]  flex-wrap items-center gap-1'>
				{row.original.genres.map(genre => (
					<p
						className='bg-foreground border-muted rounded-xl border-2 p-1.5  text-sm text-white'
						key={genre.name}
					>
						{genre.name}
					</p>
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
					<p className='bg-foreground mb-2 rounded-md p-1.5 font-light'>
						<b
							className={cn(
								'font-bold',
								row.original.visible ? 'text-success' : 'text-danger'
							)}
						>
							{row.original.visible ? 'Visible' : 'Hidden'}
						</b>
					</p>
					<p className='bg-foreground mb-2 rounded-md p-1.5 font-light'>
						<b className='font-bold text-white'>{row.original.pages}</b> pages
					</p>
					<p className='bg-foreground rounded-md p-1.5 font-light'>
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
