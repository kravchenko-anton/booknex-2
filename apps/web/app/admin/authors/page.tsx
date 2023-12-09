'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Search } from '../../../../../libs/global/icons/react'
import { useDebounce } from '../../../../mobile/src/hooks/useDebounce'
import Button from '../../../components/button/button'
import Field from '../../../components/field/field'
import { useAction } from '../../../hooks/useAction'
import { getFileUrl } from '../../../services/api/api-config'
import { authorService } from '../../../services/author/author-service'
import CreateAuthorPopup from './create-author-popup'

const Page: FC = () => {
	const { control, watch } = useForm()
	const search = useDebounce(watch('search'), 500)
	const { data: authors, isLoading } = useQuery(
		['authors' + (search || '')],
		() => authorService.all(search)
	)
	const queryClient = useQueryClient()
	const { closePopup, showPopup } = useAction()
	return (
		<div className='w-full'>
			<div className='flex w-full items-center justify-between'>
				<h1 className='text-3xl font-medium'>Authors</h1>
				<div className='flex gap-5'>
					<Field
						control={control}
						icon={Search}
						className='mb-0 h-full'
						name={'search'}
						placeholder='Search...'
					/>
					<Button
						size={'sm'}
						color='primary'
						onClick={() => {
							showPopup(
								<CreateAuthorPopup
									onCreate={() => {
										closePopup()
										queryClient.invalidateQueries(['authors'])
									}}
								/>
							)
						}}>
						Create
					</Button>
				</div>
			</div>
			{!authors || isLoading ? (
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
						{authors.map(author => (
							<tr key={author.id} className='border-foreground border-b-2'>
								<td className='p-3'>{author.id}</td>
								<td className='p-3'>
									<img
										className='h-20 w-20 rounded-md'
										src={getFileUrl(author.picture)}
										alt={author.name}
									/>
								</td>
								<td className='p-3'>{author.name}</td>
								<td className='p-3'>
									<div className='flex gap-2'>
										<Button size={'sm'} color='primary'>
											Edit
										</Button>
										<Button size={'sm'} color='warning'>
											Hide
										</Button>
										<Button size={'sm'} color='danger'>
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
