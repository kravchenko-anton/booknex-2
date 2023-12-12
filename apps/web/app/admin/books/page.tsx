'use client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Search } from '../../../../../libs/global/icons/react'
import { nFormatter } from '../../../../../libs/global/utils/number-formater'
import { useDebounce } from '../../../../mobile/src/hooks/useDebounce'
import Button from '../../../components/button/button'
import Field from '../../../components/field/field'
import { getFileUrl } from '../../../services/api/api-config'
import { bookService } from '../../../services/book/book-service'

const Page: FC = () => {
	const { control, watch } = useForm()
	const search = useDebounce(watch('search') as string, 500) || ''
	const { data: books, isLoading } = useQuery(
		['books books' + (search || '')],
		() => bookService.all(search)
	)

	const router = useRouter()
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
							<th className='min-w-[100px]  p-3'>Title</th>
							<th className='min-w-[100px]  p-3'>Description</th>
							<th className='min-w-[100px]  p-3'>Genres</th>
							<th className='min-w-[100px] p-3'>Actions</th>
						</tr>
					</thead>

					<tbody>
						{books.map(book => {
							return (
								<tr
									key={book.title + book.author.name}
									className='border-foreground items-center  justify-center border-b-2'
								>
									<td className='min-w-[60px]  text-center '>{book.id}</td>
									<td className='h-[110px]'>
										<img
											src={getFileUrl(book.picture)}
											className='bottom-shade mx-auto w-[80px] rounded-xl'
											alt={book.title}
										/>
									</td>
									<td className='h-[100px]  min-w-[140px]   text-left'>
										{book.title} <br />{' '}
										<p className='text-primary'>{book.author.name}</p>
										{book.pages} 📖 | {nFormatter(book.popularity)} 👍
									</td>
									<td className='min-w-[100px] p-2'>
										{book.description.slice(0, 300) + '...'}
									</td>
									<td className='flex min-w-[200px] flex-wrap'>
										{book.genres.map(genre => (
											<p
												key={genre.name}
												className='bg-foreground m-1  rounded-xl p-1.5 text-white'
											>
												{genre.name}
											</p>
										))}
									</td>

									<td className='min-w-[120px] p-2'>
										<div>
											<Button
												className='mb-2'
												fullWidth
												color='foreground'
												size='sm'
											>
												Preview
											</Button>
											<Button
												className='mb-2'
												fullWidth
												color='warning'
												size='sm'
											>
												Edit
											</Button>
											<Button
												className='mb-2'
												fullWidth
												color='warning'
												size='sm'
											>
												Hide
											</Button>
											<Button color='danger' fullWidth size='sm'>
												Delete
											</Button>
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
