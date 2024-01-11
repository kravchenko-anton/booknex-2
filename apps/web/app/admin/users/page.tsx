'use client'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'global/utils/useDebounce'
import { Eye, Search, Trash } from 'icons'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Color } from 'ui/colors'
import { Field, Spiner } from 'ui/components'

const PageDetails: FC = () => {
	const { control, watch } = useForm()
	const search = useDebounce(watch('search') as string, 500) || ''
	const { data: users, isLoading } = useQuery(['users', search], () =>
		userServices.all(search)
	)

	return (
		<div>
			<div className=' flex w-full items-center justify-between  p-3'>
				<h1 className='text-3xl font-medium'>Users</h1>
				<div className='flex gap-5'>
					<Field
						control={control}
						icon={Search}
						type='search'
						name='search'
						placeholder='Explore...'
					/>
				</div>
			</div>
			{!users || isLoading ? (
				<div className='bg-shade mt-4 flex items-center justify-center rounded-xl p-3'>
					<Spiner height={40} width={40} />
				</div>
			) : (
				<table className='bg-shade border-foreground mt-4 w-full rounded-xl border-2'>
					<thead>
						<tr className='border-foreground border-b-2'>
							<th className='min-w-[50px]  p-3'>Id</th>
							<th className='min-w-[300px] p-3'>Email</th>
							<th className='min-w-[600px] p-3'>Info</th>
							<th className='min-w-[150px] p-3'>Selected Genres</th>
							<th className='min-w-[100px] p-3'>Actions</th>
						</tr>
					</thead>

					<tbody>
						{users.map(user => {
							return (
								<tr
									className='border-foreground h-[100px] items-center  justify-center border-b-2'
									key={user.email}
								>
									<td className='min-w-[40px]  text-center text-2xl'>
										{user.id}
									</td>

									<td className='w-[300px] text-left   text-sm'>
										<h3 className='text-lg'>{user.email}</h3>
										<div className='mt-2 flex items-center gap-2'></div>
									</td>
									<td className='flex h-[100px] w-[600px] items-center justify-center gap-8 p-2 text-center'>
										<h2 className='text-center text-lg font-light'>
											<b className='font-bold'>{user._count.savedBooks}</b>{' '}
											<br />
											Saved Books
										</h2>
										<h2 className='text-center text-lg font-light'>
											<b className='font-bold'>{user._count.readingBooks}</b>{' '}
											<br />
											Reading Books
										</h2>
										<h2 className='text-center text-lg font-light'>
											<b className='font-bold'>{user._count.finishedBooks}</b>{' '}
											<br />
											Finished Books
										</h2>
										<h2 className='text-center text-lg font-light'>
											<b className='font-bold'>{user._count.activity}</b> <br />
											Activities
										</h2>
									</td>
									<td className='w-[300px]'>
										<div className='  flex flex-wrap items-center'>
											{user.selectedGenres.map(genre => (
												<p
													className='bg-foreground border-vibrant m-1 rounded-xl border-2 p-2  text-sm text-white'
													key={genre.name}
												>
													{genre.name}
												</p>
											))}
										</div>
									</td>

									<td className='min-w-[120px] p-2'>
										<div className='flex justify-center gap-2'>
											<Eye
												//TODO: сделать полный предпросмотр пользователя со всей одробной статистикой
												className='cursor-pointer'
												color={Color.white}
												height={25}
												size='sm'
												width={25}
											/>
											<Trash
												className='cursor-pointer'
												color={Color.danger}
												height={25}
												size='sm'
												width={25}
											/>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default PageDetails
