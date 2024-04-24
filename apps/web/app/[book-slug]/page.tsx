'use client'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import api from '../../../mobile/src/api'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import { getFileUrl } from 'global/api-config'
import Loader from '@/components/ui/loader/loader'
import { Header } from '@/app/(landing)/header'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { installAppLink } from 'global/utils'
import { successToast } from '@/utils/toast'

const Page = () => {
	const parameters = useParams()
	const slug = parameters['book-slug'] as string
	console.log(slug)
	const { data: book,isError } = useQuery({
		queryKey: QueryKeys.book.infoBySlug(slug),
		queryFn: () => api.book.infoBySlug(slug),
		select: data => data.data,
		retry: false,

	})
	if	(isError) return notFound()

	return <div>
		<Header/>
		<div className='mx-auto w-1/2'>
			{
				book ? <div className='mt-4 gap-5 px-2 md:flex'>
					<div className='mt-4 px-0.5'>
						<Image
							width={260}
							height={140}
							alt={book.title}
							src={getFileUrl(book.picture)}
							className='bg-muted cursor-pointer mb-2 rounded'
						/>
					</div>

				<div className='md:w-5/6'>
					<div className=" items-center gap-5">
						<h1 className="mb-1 text-3xl">{book.title}</h1>
						<h1 className="text-gray text-xl">{book.author}</h1>
						<div className='flex gap-2 my-2'>
								<Link href={installAppLink}>
							<Button
								size={'md'} variant={'primary'}>Start reading</Button>
								</Link>

							<Button
									size={'md'}
								variant={'foreground'} onClick={
								() => {
									navigator.clipboard.writeText(window.location.href)
									successToast('Link copied to clipboard')
								}
									}>Share</Button>
							</div>
						<div className="flex items-center  my-4 gap-2">
							<p className="text-warning border-bordered border-r-2 pr-4 text-lg">
								★ {book.rating}
							</p>
							<div className="text-gray items-center flex gap-2">
								Genres:{' '}
								{
									book.genres.map((genre,) => (
										<Button size='sm'>{genre.name}</Button>
									))}
							</div>
						</div>
					</div>


					<p className="mb-2 text-md">{book.description}</p>
				</div>
			</div>  :
			<Loader className='mx-auto'/>
			}

		</div>
	</div>
}

export default Page
