'use client'

import type { FC } from 'react'
import { Search } from '../../../../../libs/global/icons/react'
import { nFormatter } from '../../../../../libs/global/utils/number-formater'
import Button from '../../../components/button/button'
import Field from '../../../components/field/field'
import NewParsePopup from './new-parse-popup'
import { useParser } from './useParser'

const Parser: FC = () => {
	const {
		parse,
		lastParsedData,
		parseLoading,
		control,
		goodReadsLoading,
		updateLastParsedData,
		goodReadsBooks,
		showPopup,
		closePopup,
		deleteFromParser
	} = useParser()

	return (
		<div className='w-full'>
			<div className='flex w-full items-center justify-between'>
				<h1 className='text-3xl font-medium'>Seeder</h1>
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
						isLoading={parseLoading}
						onClick={() =>
							showPopup(
								<NewParsePopup
									defaultValues={{
										link: lastParsedData?.url || '',
										page: lastParsedData?.page + 1 || 0
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
						color='primary'>
						{'Parsing'}
					</Button>
				</div>
			</div>
			{!goodReadsBooks || goodReadsLoading ? (
				<div>Loading...</div>
			) : (
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
						{goodReadsBooks.map(book => (
							<tr
								key={book.title}
								className='border-foreground max-h-[100px] items-center  justify-center border-b-2'>
								<td className='min-w-[60px]  text-center '>{book.id}</td>
								<td className='  h-[160px] '>
									<img
										src={book.picture}
										className='bottom-shade mx-auto w-[100px] rounded-xl'
										alt={book.title}
									/>
								</td>
								<td className='h-[100px]  min-w-[100px]   text-left'>
									{book.title} <br />{' '}
									<p className='text-primary'>{book.authorName}</p>
									{book.pages} 📖 | {nFormatter(book.popularity)} 👍
								</td>
								<td className='min-w-[100px] p-2'>
									{book.description.slice(0, 500) + '...'}
								</td>
								<td className='min-w-[100px] max-w-[220px] p-2'>
									<img
										src={book.authorPicture}
										className='mb-1 h-[50px] w-[50px] rounded-xl'
										alt={book.title}
									/>
									{book.authorDescription.slice(0, 100) + '...'}
								</td>
								<td className='min-w-[100px]'>{book.genres.join(',  ')}</td>

								<td className='min-w-[120px] p-2'>
									<div>
										<Button
											className='mb-2'
											fullWidth
											color='success'
											size='sm'>
											Create
										</Button>
										<Button
											color='danger'
											fullWidth
											size='sm'
											onClick={() => deleteFromParser(book.id)}>
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

export default Parser
