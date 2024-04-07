import type { ColumnDef } from '@tanstack/react-table'
import { FullBookReviewInner } from 'global/api-client'
import { Color } from 'global/colors'
import { Star } from 'icons'
import { useState } from 'react'

export const reviewColumns = (): ColumnDef<FullBookReviewInner, unknown>[] => [
	//TODO: добавить информацию о пользователе
	{
		id: 'Rating',
		header: () => <p className='text-center text-xl'>Rating</p>,
		cell: ({ row }) => {
			console.log(row.original.rating, 'row.original.rating')
			return (
				<div className='flex  items-center justify-center'>
					{Array.from({ length: 5 - row.original.rating }).map(star => (
						<Star
							className='mx-1 cursor-pointer'
							width={22}
							height={22}
							key={star}
							fill={Color.warning}
							stroke={Color.warning}
						/>
					))}
				</div>
			)
		}
	},
	{
		id: 'text',
		header: () => <p className='text-center text-xl'>Text</p>,
		cell: ({ row }) => {
			const [showMore, setShowMore] = useState(false)
			return (
				<div className='flex items-center justify-center'>
					<button className=' text-sm' onClick={() => setShowMore(!showMore)}>
						{showMore
							? row.original.text
							: row.original.text?.slice(0, 250) + '...'}
					</button>
				</div>
			)
		}
	},

	{
		id: 'tags',
		header: () => <p className='text-center text-xl'>Tags</p>,
		cell: ({ row }) => (
			<div className='flex flex-wrap items-center justify-center gap-1.5'>
				{row.original.tags.map(tag => (
					<p key={tag} className='bg-foreground rounded p-1.5 font-light'>
						<b className='font-bold text-white'>{tag}</b>
					</p>
				))}
			</div>
		)
	}
]
