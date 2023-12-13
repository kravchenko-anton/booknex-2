'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import {
	Edit,
	Eye,
	EyeOff,
	Search,
	Trash
} from '../../../../../libs/global/icons/react'
import { errorCatch } from '../../../../../libs/global/utils/catch-error'
import { nFormatter } from '../../../../../libs/global/utils/number-formater'
import { Color } from '../../../../../libs/ui/colors'
import { useDebounce } from '../../../../mobile/src/hooks/useDebounce'
import Button from '../../../components/button/button'
import Field from '../../../components/field/field'
import { useAction } from '../../../hooks/useAction'
import { getFileUrl } from '../../../services/api/api-config'
import { bookService } from '../../../services/book/book-service'
import { successToast } from '../../../utils/toast'
import AuthorDescription from '../authors/popup/description-popup'

const Page: FC = () => {
	const { control, watch } = useForm()
	const QueryClient = useQueryClient()
	const search = useDebounce(watch('search') as string, 500) || ''
	const { data: books } = useQuery(['app book' + search || ''], () =>
		bookService.all(search)
	)
	const { showPopup } = useAction()

	const { mutateAsync: toggleVisible } = useMutation(
		['update visible'],
		(id: number) => bookService.toggleVisible(id),
		{
			onError(error: string) {
				errorCatch(error)
			},
			async onSuccess() {
				successToast('Book visibility changed')
				await QueryClient.invalidateQueries(['app book'])
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
				await QueryClient.invalidateQueries(['app book'])
			}
		}
	)
	return (
		<div className='w-full'>
			<div className='flex w-full items-center justify-between'>
				<h1 className='text-3xl font-medium'>Seeder</h1>
				<div className='flex gap-5'>
					<Field
						control={control}
						icon={Search}
						className='mb-0 h-full'
						name='search'
						placeholder='Search...'
					/>
					<Button size='sm' color='primary'>
						Parsing
					</Button>
				</div>
			</div>
			{books ? (
				<table className='bg-shade mt-4 w-full rounded-xl'>
					<thead>
						<tr className='border-foreground border-b-2'>
							<th className='min-w-[50px]   p-3'>Id</th>
							<th className='min-w-[120px]  p-3'>Picture</th>
							<th className='min-w-[100px]  p-3'>Bio</th>
							<th className='w-[100px] min-w-[100px]  p-3'>Info</th>
							<th className='min-w-[100px]  p-3'>Statisctic</th>
							<th className='min-w-[100px]  p-3'>Genres</th>
							<th className='min-w-[100px] p-3'>Actions</th>
						</tr>
					</thead>

					<tbody>
						{books.map(book => {
							return (
								<tr
									key={book.title + book.author.name}
									className='border-foreground h-[120px] items-center  justify-center border-b-2'
								>
									<td className='min-w-[40px]  text-center text-2xl'>
										{book.id}
									</td>
									<td className='h-[120px]'>
										<img
											src={getFileUrl(book.picture)}
											className='bottom-shade mx-auto w-[100px] rounded-xl'
											alt={book.title}
										/>
									</td>
									<td className='h-[100px] min-w-[140px] text-left   text-sm'>
										{book.title} <br />{' '}
										<p className='text-primary'>{book.author.name}</p>
										<Button
											className='my-1'
											color='primary'
											onClick={() => {
												showPopup(<AuthorDescription text={book.description} />)
											}}
											size='sm'
										>
											💬 Description
										</Button>
									</td>
									<td className='w-[120px] items-center justify-center p-2 text-center'>
										<h2>{book.pages} 📖</h2>
										<h2>{nFormatter(book.popularity)} 👍</h2>
									</td>
									<td className='min-w-[600px] p-2'>
										{
											// TODO: сделать тут статистику
										}
									</td>
									<td className='w-[200px]'>
										<div className='my-auto  flex flex-wrap items-center justify-end'>
											{book.genres.map(genre => (
												<p
													key={genre.name}
													className='bg-foreground m-1 rounded-xl  p-1.5 text-sm text-white'
												>
													{genre.name}
												</p>
											))}
										</div>
									</td>

									<td className='min-w-[120px] p-2'>
										<div className='flex gap-2'>
											<div
												color={book.visible ? 'primary' : 'secondary'}
												className='cursor-pointer'
												onClick={() => {
													toggleVisible(book.id)
												}}
											>
												{book.visible ? (
													<Eye
														width={25}
														className='cursor-pointer'
														color={Color.success}
														height={25}
													/>
												) : (
													<EyeOff
														className='cursor-pointer'
														color={Color.danger}
														width={25}
														height={25}
													/>
												)}
											</div>
											<Edit
												width={25}
												className='cursor-pointer'
												height={25}
												color={Color.warning}
											/>

											<Trash
												width={25}
												className='cursor-pointer'
												height={25}
												onClick={() => {
													detele(book.id)
												}}
												color={Color.danger}
												fullWidth
												size='sm'
											/>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			) : (
				<div>Loading...</div>
			)}
		</div>
	)
}

export default Page
