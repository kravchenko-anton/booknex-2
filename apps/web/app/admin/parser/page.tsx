'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Search } from '../../../../../libs/global/icons/react'
import type { ParserDtoPayload } from '../../../../../libs/global/services-types/parser-types'
import { nFormatter } from '../../../../../libs/global/utils/number-formater'
import { useDebounce } from '../../../../../libs/global/utils/useDebounce'
import Button from '../../../components/button/button'
import Field from '../../../components/field/field'
import { useAction } from '../../../hooks/useAction'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { parserService } from '../../../services/parser/parser-services'
import { successToast } from '../../../utils/toast'
import CreateAuthorPopup from '../authors/popup/create'
import type { DeafultCreateBookValuesType } from '../books/create/useForm'
import NewParse from './popup/new-parse'

const Parser: FC = () => {
	const { control, watch } = useForm()
	const QueryClient = useQueryClient()
	const { showPopup, closePopup, updateLastParsedData } = useAction()
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
	const { data: goodReadsBooks } = useQuery(['goodRead books' + search], () =>
		parserService.all(search)
	)
	const router = useRouter()
	console.log(goodReadsBooks)
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
					<Button
						size='sm'
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
						color='primary'
					>
						Parsing
					</Button>
				</div>
			</div>
			{goodReadsBooks ? (
				<table className='bg-shade mt-4 w-full rounded-xl'>
					<thead>
						<tr className='border-foreground border-b-2'>
							<th className='min-w-[50px]   p-3'>Id</th>
							<th className='min-w-[120px]  p-3'>Picture</th>
							<th className='min-w-[100px]  p-3'>Title</th>
							<th className='min-w-[100px]  p-3'>Description</th>
							<th className='min-w-[100px]  p-3'>Author description</th>
							<th className='min-w-[100px]  p-3'>Genres</th>
							<th className='min-w-[100px] p-3'>Actions</th>
						</tr>
					</thead>

					<tbody>
						{goodReadsBooks.map(book => {
							return (
								<tr
									key={book.title + book.authorName}
									className='border-foreground items-center  justify-center border-b-2'
								>
									<td className='min-w-[60px]  text-center '>{book.id}</td>
									<td className='h-[110px]'>
										<img
											src={book.picture}
											className='bottom-shade mx-auto w-[80px] rounded-xl'
											alt={book.title}
										/>
									</td>
									<td className='h-[100px]  min-w-[140px]   text-left'>
										{book.title} <br />{' '}
										<p className='text-primary'>{book.authorName}</p>
										{book.pages} 📖 | {nFormatter(book.popularity)} 👍
									</td>
									<td className='min-w-[100px] p-2'>
										{book.description.slice(0, 300) + '...'}
									</td>
									<td className='min-w-[300px] max-w-[220px] p-2'>
										<img
											src={book.authorPicture}
											className='mb-1 h-[50px] w-[50px] rounded-xl'
											alt={book.title}
										/>
										{book.authorDescription.slice(0, 100) + '...'}
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
												color='success'
												onClick={async () => {
													const blob = await fetch(book.authorPicture).then(
														result => result.blob()
													)
													console.log(blob)
													showPopup(
														<CreateAuthorPopup
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
																			} as DeafultCreateBookValuesType)
																		}).toString()
																)
															}}
															defaultValues={{
																name: book.authorName,
																description: book.authorDescription,
																picture: {
																	blob,
																	name: `${book.authorName}.png`
																}
															}}
														/>
													)
												}}
												size='sm'
											>
												Create
											</Button>
											<Button
												color='danger'
												fullWidth
												size='sm'
												onClick={() => deleteFromParser(book.id)}
											>
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

export default Parser
