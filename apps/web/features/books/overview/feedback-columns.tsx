import { Color } from 'global/colors'
import { Star } from 'global/icons/react-native'
import * as React from 'react'
import { useState } from 'react'

export const feedbackColumns = () => [
	{
		id: 'id',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>id</p>,
		cell: ({ row }) => {
			return <p className='text-2xl'>{row.original.id}</p>
		}
	},
	{
		id: 'user',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>User</p>,
		cell: ({ row }) => {
			//TODO: добавить тут данные пользователя после того как я сделаю авторизацию через google
			return <h1>{row.original.email}</h1>
		}
	},
	{
		id: 'Rating',
		header: () => <p className='text-center text-xl'>Rating</p>,
		cell: ({ row }) => {
			return (
				<div className='w-[250px]'>
					{[1, 2, 3, 4, 5].map(star => {
						return (
							<Star
								width={35}
								height={35}
								key={star}
								stroke={Color.warning}
								fill={
									star <= row.original.rating
										? Color.warning
										: Color.transparent
								}
							/>
						)
					})}
				</div>
			)
		}
	},
	{
		// tags
		id: 'tags',
		header: () => <p className='text-center text-xl'>Tags</p>,
		cell: ({ row }) => {
			return (
				<div className='w-[250px]'>
					{row.original.tags.map(tag => {
						return (
							<p className='bg-foreground mt-2 rounded-xl p-1.5 font-light'>
								<b className='font-bold text-white'>{tag.name}</b>
							</p>
						)
					})}
				</div>
			)
		}
	},
	// text
	{
		id: 'text',
		header: () => <p className='text-center text-xl'>Text</p>,
		cell: ({ row }) => {
			const [showMore, setShowMore] = useState(false)
			return (
				<p className='mb-2 text-sm' onClick={() => setShowMore(!showMore)}>
					{showMore
						? row.original.text
						: row.original.text.slice(0, 250) + '...'}
				</p>
			)
		}
	}
]
