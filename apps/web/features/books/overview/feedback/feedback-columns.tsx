import type { ColumnDef } from '@tanstack/react-table'
import { Color } from 'global/colors'
import { Star } from 'icons'
import * as React from 'react'
import { useState } from 'react'

type ColumnType = ColumnDef<{
	id: number
	user: {
		email: string
	}
	rating: number
	text: string
	tags: string[]
}>[]
export const feedbackColumns = (): ColumnType => [
	{
		id: 'id',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>id</p>,
		cell: ({ row }) => {
			return <p className='text-2xl'>{row.original.id}</p>
		}
	},
	{
		id: 'User',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>User</p>,
		cell: ({ row }) => {
			//TODO: добавить тут данные пользователя после того как я сделаю авторизацию через google
			return <h1 className='text-lg'>{row.original.user.email}</h1>
		}
	},

	{
		id: 'Rating',
		header: () => <p className='text-center text-xl'>Rating</p>,
		cell: ({ row }) => {
			console.log(row.original.rating, 'row.original.rating')
			return (
				<div className='flex  items-center justify-center'>
					{Array.from({ length: 5 - row.original.rating }).map(star => {
						return (
							<Star
								className='mx-1 cursor-pointer'
								width={22}
								height={22}
								key={star}
								fill={Color.warning}
								stroke={Color.warning}
							/>
						)
					})}
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
							: row.original.text.slice(0, 250) + '...'}
					</button>
				</div>
			)
		}
	},

	{
		id: 'tags',
		header: () => <p className='text-center text-xl'>Tags</p>,
		cell: ({ row }) => {
			return (
				<div className='flex flex-wrap items-center justify-center gap-1.5'>
					{row.original.tags.map(tag => {
						return (
							<p
								key={tag}
								className='bg-foreground rounded-xl p-1.5 font-light'
							>
								<b className='font-bold text-white'>{tag}</b>
							</p>
						)
					})}
				</div>
			)
		}
	}
]
