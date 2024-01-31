import { getFileUrl } from 'global/api-config'
import { nFormatter } from 'global/utils/number-formater'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const columns = ({ preview }: { preview: (id: number) => void }) => [
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
				<div className='w-[210px]'>
					<h3 onClick={() => preview(row.original.id)} className='mb-1 text-xl'>
						{row.original.title}
					</h3>
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
	}
]
