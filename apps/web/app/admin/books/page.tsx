'use client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Search } from '../../../../../libs/global/icons/react'
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
				<h1 className='text-3xl font-medium'>Books</h1>
				<div className='flex gap-5'>
					<Field
						control={control}
						icon={Search}
						className='mb-0 h-full'
						name='search'
						placeholder='Search...'
					/>
					<Button
						size='sm'
						onClick={() => router.push('admin/books/create')}
						color='primary'
					>
						Create
					</Button>
				</div>
			</div>
			{!books || isLoading ? (
				<div>Loading...</div>
			) : (
				<table className='bg-shade mt-4 w-full rounded-xl'>
					<thead>
						<tr className='border-foreground border-b-2'>
							<th className='min-w-[50px]   p-3'>Id</th>
							<th className='min-w-[120px]  p-3'>Picture</th>
							<th className='min-w-[100px]  p-3'>Title</th>
							<th className='min-w-[100px] p-3'>Actions</th>
						</tr>
					</thead>

					<tbody>
						{books.map(book => (
							<tr key={book.id} className='border-foreground border-b-2'>
								<td className='p-3'>{book.id}</td>
								<td className='p-3'>
									<img
										className='h-20 w-20 rounded-md'
										src={getFileUrl(book.picture)}
										alt={book.title}
									/>
								</td>
								<td className='p-3'>{book.title}</td>
								<td className='p-3'>
									<div className='flex gap-2'>
										<Button size='sm' color='primary'>
											Edit
										</Button>
										<Button size='sm' color='warning'>
											Hide
										</Button>
										<Button size='sm' color='danger'>
											Delete
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Page
