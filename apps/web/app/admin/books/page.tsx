'use client'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFileUrl } from 'global/api-config'
import { Edit, Eye, EyeOff, Search, Trash } from 'global/icons/react'
import { errorCatch } from 'global/utils/catch-error'
import { nFormatter } from 'global/utils/number-formater'
import { useDebounce } from 'global/utils/useDebounce'
import { useRouter } from 'next/navigation'
import { usePopupContext } from 'providers/popup-provider'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { bookService } from 'services/book/book-service'
import { Color } from 'ui/colors'
import { Button, Field, Spiner } from 'ui/components'
import AuthorDescription from '../authors/popup/description-popup'

const Page: FC = () => {
	const { control, watch } = useForm()
	const QueryClient = useQueryClient()
	const search = useDebounce(watch('search') as string, 500) || ''
	const { data: books, isLoading: booksLoading } = useQuery(
		['books', search],
		() => bookService.all(search)
	)
	const router = useRouter()
	const { showPopup } = usePopupContext()

	const { mutateAsync: toggleVisible } = useMutation(
		['update visible'],
		(id: number) => bookService.toggleVisible(id),
		{
			onError(error: string) {
				errorCatch(error)
			},
			async onSuccess() {
				successToast('Book visibility changed')
				await QueryClient.invalidateQueries(['books'])
			}
		}
	)

	const { mutateAsync: detele } = useMutation(
		['delete book'],
		(id: number) => bookService.delete(id),
		{
			onError(error: string) {
				errorCatch(error)
			},
			async onSuccess() {
				successToast('Book deleted')
				await QueryClient.invalidateQueries(['books'])
			}
		}
	)
	return (
		<div className='w-full'>
			<div className='  flex  w-full items-center justify-between   p-3'>
				<h1 className='text-3xl font-medium'>Books</h1>
				<div className='flex gap-5'>
					<Field
						control={control}
						icon={Search}
						name='search'
						placeholder='Explore...'
						type='search'
					/>
					<Button
						onClick={() => {
							router.push('/admin/books/create')
						}}
						size='sm'
						variant='primary'
					>
						Create
					</Button>
				</div>
			</div>
			{!books || booksLoading ? (
				<div className='bg-shade mt-4 flex items-center justify-center rounded-xl p-3'>
					<Spiner height={40} width={40} />
				</div>
			) : (
				<table className='bg-shade border-foreground mt-4 w-full rounded-xl border-2'>
					<thead>
						<tr className='border-foreground border-b-2'>
							<th className='min-w-[50px]   p-3'>Id</th>
							<th className='min-w-[120px]  p-3'>Picture</th>
							<th className='min-w-[100px]  p-3'>Bio</th>
							<th className='w-[100px] min-w-[100px]  p-3'>Info</th>
							<th className='min-w-[100px]  p-3'>Statistic</th>
							<th className='min-w-[100px]  p-3'>Genres</th>
							<th className='min-w-[100px] p-3'>Actions</th>
						</tr>
					</thead>

					<tbody>
						{books.map(book => {
							return (
								<tr
									className='border-foreground h-[150px] items-center  justify-center border-b-2'
									key={book.title + book.author.name}
								>
									<td className='min-w-[40px]  text-center text-2xl'>
										{book.id}
									</td>
									<td className='h-[130px]'>
										<img
											alt={book.title}
											className='bottom-shade mx-auto w-[100px] rounded-xl'
											src={getFileUrl(book.picture)}
										/>
									</td>
									<td className='min-w-[200px] text-left text-sm'>
										<h3 className='text-lg'>{book.title}</h3>

										<p className='text-primary mb-1'>{book.author.name}</p>
										<Button
											onClick={() => {
												showPopup(<AuthorDescription text={book.description} />)
											}}
											size='sm'
											variant='primary'
										>
											💬 Description
										</Button>
									</td>
									<td className='w-[250px] p-2'>
										<h2 className='text-lg font-light'>
											Pages: <b className='font-bold'>{book.pages}</b>
										</h2>
										<h2 className='mt-2 text-lg font-light'>
											Popularity:{' '}
											<b className='font-bold'>{nFormatter(book.popularity)}</b>
										</h2>
									</td>
									<td className='min-w-[600px] p-2'>
										{
											// TODO: сделать тут статистику
										}
									</td>
									<td className='w-[300px]'>
										<div className='my-auto  flex flex-wrap items-center'>
											{book.genres.map(genre => (
												<p
													className='bg-foreground m-1 rounded-xl p-1.5 text-sm text-white'
													key={genre.name}
												>
													{genre.name}
												</p>
											))}
										</div>
									</td>

									<td className='min-w-[120px] p-2'>
										<div className='flex gap-2'>
											<button
												className='cursor-pointer'
												color={book.visible ? 'primary' : 'secondary'}
												onClick={() => {
													toggleVisible(book.id)
												}}
											>
												{book.visible ? (
													<Eye
														className='cursor-pointer'
														color={Color.success}
														height={25}
														width={25}
													/>
												) : (
													<EyeOff
														className='cursor-pointer'
														color={Color.danger}
														height={25}
														width={25}
													/>
												)}
											</button>
											<Edit
												className='hover:text-primary cursor-pointer transition-all duration-200'
												color={Color.gray}
												height={25}
												onClick={() => {
													router.push(`/admin/books/update/${book.id}`)
												}}
												width={25}
											/>

											<Trash
												className='hover:text-primary cursor-pointer transition-all duration-200'
												color={Color.gray}
												height={25}
												onClick={() => {
													detele(book.id)
												}}
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

export default Page
