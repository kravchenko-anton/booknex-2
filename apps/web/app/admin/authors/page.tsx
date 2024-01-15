'use client'
import CreateAuthorPopup from '@/app/admin/authors/popup/create'
import { Button, Field, Spiner } from '@/components/ui'
import { Dialog } from '@/components/ui/dialog'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTrigger
} from '@/components/ui/sheet'
import { authorService } from '@/services/author/author-service'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFileUrl } from 'global/api-config'
import { Color } from 'global/colors'
import { useDebounce } from 'global/utils/useDebounce'
import { Edit, Search, Trash } from 'icons'
import Image from 'next/image'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

const PageDetails: FC = () => {
	const { control, watch } = useForm()
	const QueryClient = useQueryClient()
	const search = useDebounce(watch('search') as string, 500) || ''
	const { data: authors, isLoading } = useQuery(['authors', search], () =>
		authorService.all(search)
	)
	const { mutateAsync: deleteAuthor } = useMutation(
		['delete  author'],
		(id: number) => authorService.delete(id),
		{
			onSuccess: () => {
				successToast('Author deleted')
				QueryClient.invalidateQueries(['authors'])
			}
		}
	)
	const queryClient = useQueryClient()
	return (
		<Sheet>
			<Dialog>
				<div>
					<div className=' flex w-full items-center justify-between  p-3'>
						<h1 className='text-3xl font-medium'>Authors</h1>
						<div className='flex gap-5'>
							<Field
								control={control}
								icon={Search}
								type='search'
								name='search'
								placeholder='Explore...'
							/>
							<SheetTrigger>
								<Button size='sm' variant='primary'>
									Create
								</Button>
							</SheetTrigger>
						</div>
					</div>
					{!authors || isLoading ? (
						<div className='bg-shade mt-4 flex items-center justify-center rounded-xl p-3'>
							<Spiner height={40} width={40} />
						</div>
					) : (
						<table className='bg-shade border-foreground mt-4 w-full rounded-xl border-2'>
							<thead>
								<tr className='border-foreground border-b-2'>
									<th className='min-w-[40px] p-4'>Id</th>
									<th className='min-w-[100px]  p-4'>Picture</th>
									<th className='min-w-[140px]  p-4'>Name</th>
									<th className='min-w-[200px]  p-4'>Description</th>
									<th className='min-w-[150px]  p-4'>Books</th>
									<th className='min-w-[100px] p-4'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{authors.map(author => {
									return (
										<tr
											key={author.description + author.name}
											className='border-foreground h-[140px] items-center  justify-center rounded-xl  border-b-2'
										>
											<td className='w-[40px]  text-center text-2xl'>
												{author.id}
											</td>
											<td className='w-[100px] max-w-[100px]'>
												<Image
													width={100}
													height={100}
													src={getFileUrl(author.picture)}
													className='bottom-shade mx-auto w-[100px] rounded-xl'
													alt={author.name}
												/>
											</td>
											<td className='w-[150px] pl-2 text-left'>
												<h2 className='mb-2  text-white'>{author.name}</h2>
											</td>
											<td className='w-[700px] min-w-[500px] p-2'>
												<p className='mb-2 text-sm'>
													{author.description.slice(0, 400) + '...'}
												</p>
											</td>
											<td className=' flex min-w-[400px] max-w-full overflow-y-scroll  p-2'>
												{author.books.map(book => (
													<Image
														width={100}
														height={100}
														key={book.picture}
														src={getFileUrl(book.picture)}
														className='mr-2 rounded-xl'
														alt={author.name}
													/>
												))}
											</td>

											<td className='w-[100px]  p-2'>
												<div className='flex gap-2'>
													<Edit
														width={25}
														height={25}
														className='hover:text-primary cursor-pointer transition-all duration-200'
														color={Color.gray}
													/>

													<Trash
														width={25}
														className='hover:text-primary cursor-pointer transition-all duration-200'
														color={Color.gray}
														height={25}
														onClick={() => {
															deleteAuthor(author.id)
														}}
														size='sm'
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
				<SheetContent>
					<SheetHeader>
						<h1 className='text-2xl font-medium'>Create author</h1>
					</SheetHeader>
					<div>
						<CreateAuthorPopup
							onCreate={() => {
								queryClient.invalidateQueries(['authors'])
								SheetClose({})
							}}
						/>
					</div>
				</SheetContent>
			</Dialog>
		</Sheet>
	)
}

export default PageDetails
