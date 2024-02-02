import type { ColumnDef } from '@tanstack/react-table'
import { getFileUrl } from 'global/api-config'
import { nFormatter } from 'global/utils/number-formater'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

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
					onClick={() => preview(row.original.id)}
					alt={row.original.title}
					className=' mx-auto w-[100px] cursor-pointer rounded-xl'
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
				<button
					onClick={() => preview(row.original.id)}
					className='w-[210px] items-start justify-start text-left'
				>
					<h3 className='mb-1 text-xl'>{row.original.title}</h3>
					<p>{row.original.author}</p>
					<div className='mt-2 flex flex-wrap gap-2'>
						<p className='bg-foreground rounded-md p-1.5 font-light'>
							visible:{' '}
							<b
								className={twMerge(
									'font-bold',
									row.original.visible ? 'text-success' : 'text-warning'
								)}
							>
								{row.original.visible ? 'true' : 'false'}
							</b>
						</p>
						<p className='bg-foreground rounded-md p-1.5 font-light'>
							<b className='font-bold text-white'>{row.original.pages}</b> pages
						</p>
						<p className='bg-foreground rounded-md p-1.5 font-light'>
							<b className='font-bold text-white'>
								{nFormatter(row.original.popularity)}{' '}
							</b>{' '}
							popularity
						</p>
					</div>
				</button>
			)
		}
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
	}
]
