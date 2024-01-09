'use client'

import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFileUrl } from 'global/api-config'
import { Edit, Search, Trash } from 'global/icons/react'
import type { ParserDtoPayload } from 'global/services-types/parser-types'
import { nFormatter } from 'global/utils/number-formater'
import { useDebounce } from 'global/utils/useDebounce'
import { useAction, useTypedSelector } from 'hooks'
import { useRouter } from 'next/navigation'
import { usePopupContext } from 'providers/popup-provider'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { authorService } from 'services/author/author-service'
import { parserService } from 'services/parser/parser-services'
import { Color } from 'ui/colors'
import { Button, Field, Spiner } from 'ui/components'
import CreateAuthorPopup from '../authors/popup/create'
import type { DefaultCreateBookValuesType } from '../books/create/types'
import NewParse from './popup/new-parse'

const Parser: FC = () => {
	const { control, watch } = useForm()
	const QueryClient = useQueryClient()
	const { updateLastParsedData } = useAction()
	const { showPopup, closePopup } = usePopupContext()
	const { lastParsedData } = useTypedSelector(state => state.parser)
	const { mutateAsync: parse, isLoading: parseLoading } = useMutation(
		['parse good-reads books'],
		(dto: ParserDtoPayload) => parserService.parse(dto),
		{
			onSuccess: () => {
				successToast('Books parsed')
				QueryClient.invalidateQueries(['good-reads books'])
			}
		}
	)

	const { mutateAsync: checkAuthorExist } = useMutation(
		['check author exist'],
		(name: string) => authorService.exist(name)
	)
	const { mutateAsync: deleteFromParser } = useMutation(
		['delete from parser'],
		(id: number) => parserService.delete(id),
		{
			onSuccess: () => {
				successToast('Book deleted')
				QueryClient.invalidateQueries(['good-reads books'])
			}
		}
	)
	const search = useDebounce(watch('search') as string, 500) || ''
	const { data: goodReadsBooks, isLoading: goodReadsBooksLoading } = useQuery(
		['good-reads books', search],
		() => parserService.all(search)
	)
	const router = useRouter()
	console.log(goodReadsBooks)
	return (
		<div className='w-full'>
			<div className='bg-shade flex w-full items-center justify-between rounded-xl p-3'>
				<h1 className='text-3xl font-medium'>Seeder</h1>
				<div className='flex gap-5'>
					<Field
						control={control}
						icon={Search}
						name='search'
						placeholder='Explore...'
						type='search'
					/>
					<Button
						isLoading={parseLoading}
						onClick={() =>
							showPopup(
								<NewParse
									defaultValues={{
										link: lastParsedData?.url ?? '',
										page: (lastParsedData && lastParsedData.page + 1) ?? 0
									}}
									onSubmit={data => {
										parse({
											page: +data.page,
											url: data.link
										})
										updateLastParsedData({
											page: +data.page,
											url: data.link
										})
										closePopup()
									}}
								/>
							)
						}
						size='sm'
						variant='primary'
					>
						Parsing
					</Button>
				</div>
			</div>
			{!goodReadsBooks || goodReadsBooksLoading ? (
				<div className='bg-shade mt-4 flex items-center justify-center rounded-xl p-3'>
					<Spiner height={40} width={40} />
				</div>
			) : (
				<table className='bg-shade mt-4 w-full rounded-xl'>
					<thead>
						<tr className='border-foreground border-b-2'>
							<th className='min-w-[50px]   p-3'>Id</th>
							<th className='min-w-[120px]  p-3'>Picture</th>
							<th className='min-w-[100px]  p-3'>Bio</th>
							<th className='w-[100px] min-w-[100px]  p-3'>Info</th>
							<th className='min-w-[100px]  p-3'>Description</th>
							<th className='min-w-[100px]  p-3'>Author description</th>
							<th className='min-w-[100px] p-3'>Actions</th>
						</tr>
					</thead>

					<tbody>
						{goodReadsBooks.map(book => {
							return (
								<tr
									className='border-foreground items-center  justify-center border-b-2'
									key={book.title + book.authorName}
								>
									<td className='min-w-[40px]  text-center text-2xl'>
										{book.id}
									</td>
									<td className='h-[120px]'>
										<img
											alt={book.title}
											className='bottom-shade mx-auto w-[100px] rounded-xl'
											src={getFileUrl(book.picture)}
										/>
									</td>
									<td className='h-[100px]  min-w-[140px]  text-left  text-xl'>
										{book.title} <br />{' '}
										<p className='text-primary text-lg'>{book.authorName}</p>
									</td>
									<td className='w-[100px] items-center justify-center p-2 text-center'>
										<h2>{book.pages} 📖</h2>
										<h2>{nFormatter(book.popularity)} 👍</h2>
									</td>
									<td className='min-w-[100px] p-2'>
										{book.description.slice(0, 500) + '...'}
									</td>
									<td className='min-w-[300px] max-w-[220px] p-2'>
										<img
											alt={book.title}
											className='mb-1 h-[50px] w-[50px] rounded-xl'
											src={book.authorPicture}
										/>
										{book.authorDescription.slice(0, 200) + '...'}
									</td>

									<td className='w-[50px] p-2'>
										<div className='flex  items-center justify-center gap-2'>
											<Edit
												className='cursor-pointer'
												color={Color.success}
												height={25}
												onClick={async () => {
													const blob = await fetch(book.authorPicture).then(
														result => result.blob()
													)
													const author = await checkAuthorExist(book.authorName)
													if (author) {
														router.push(
															'/admin/books/create' +
																'?' +
																new URLSearchParams({
																	defaultValues: JSON.stringify({
																		author: {
																			id: author.id,
																			name: author.name
																		},
																		title: book.title,
																		description: book.description,
																		pages: book.pages,
																		popularity: book.popularity,
																		genres: book.genres
																	} as DefaultCreateBookValuesType)
																}).toString()
														)
													} else {
														showPopup(
															<CreateAuthorPopup
																defaultValues={{
																	name: book.authorName,
																	description: book.authorDescription,
																	picture: {
																		blob,
																		name: `${book.authorName}.png`
																	}
																}}
																onCreate={({ id, name }) => {
																	closePopup()
																	router.push(
																		'/admin/books/create' +
																			'?' +
																			new URLSearchParams({
																				defaultValues: JSON.stringify({
																					author: {
																						id,
																						name
																					},
																					title: book.title,
																					description: book.description,
																					pages: book.pages,
																					popularity: book.popularity,
																					genres: book.genres
																				} as DefaultCreateBookValuesType)
																			}).toString()
																	)
																}}
															/>
														)
													}
												}}
												width={25}
											/>

											<Trash
												className='cursor-pointer'
												color={Color.danger}
												height={25}
												onClick={() => deleteFromParser(book.id)}
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

export default Parser
