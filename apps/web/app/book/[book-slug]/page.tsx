'use client'
import { Header } from '@/app/(landing)/header'
import { Button } from '@/components/ui'
import GenreElement from '@/components/ui/genre-element'
import Loader from '@/components/ui/loader/loader'
import api from '@/services/api'
import { successToast } from '@/utils/toast'
import { useQuery } from '@tanstack/react-query'
import { getFileUrl } from 'global/api-config'
import { installAppLink } from 'global/utils'
import { QueryKeys } from 'global/utils/query-keys'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'

const Page = () => {
	const parameters = useParams()
	const slug = parameters['book-slug'] as string
	console.log(slug)
	const { data: book, isError } = useQuery({
		queryKey: QueryKeys.book.infoBySlug(slug),
		queryFn: () => api.book.infoBySlug(slug),
		select: data => data.data,
		retry: false
	})
	if (isError) return notFound()

	return (
		<div>
			<Header />
			<div className='md:mx-auto md:w-4/5 lg:w-2/3'>
				{book ? (
					<div className='mt-4 gap-5 px-2 md:flex'>
						<div className='mt-4 px-0.5'>
							<Image
								width={260}
								height={140}
								alt={book.title}
								src={getFileUrl(book.picture)}
								className='bg-muted border-bordered mb-2 cursor-pointer rounded-md border-2'
							/>
						</div>

						<div className='md:w-4/5'>
							<div className=' items-center gap-5'>
								<h1 className='mb-1 text-3xl'>{book.title}</h1>
								<div className='flex gap-4'>
									<h1 className='text-gray text-xl'>{book.author}</h1>
									<p className='text-warning border-bordered text-lg'>
										★ {book.rating}
									</p>
								</div>
								<div className='my-4 flex gap-2'>
									<Link href={installAppLink}>
										<Button size={'md'} variant={'primary'}>
											Start reading
										</Button>
									</Link>

									<Button
										size={'md'}
										variant={'foreground'}
										onClick={() => {
											navigator.clipboard.writeText(window.location.href)
											successToast('Link copied to clipboard')
										}}>
										Share
									</Button>
								</div>
							</div>

							<p className='text-md mb-2'>{book.description}</p>
							<h4 className='mb-2 mt-4 text-lg font-bold'>Genres</h4>
							<div className='text-gray flex items-center gap-2 overflow-auto'>
								{book.genres.map(genre => (
									<GenreElement title={genre.name} svgUri={genre.icon} />
								))}
							</div>
						</div>
					</div>
				) : (
					<Loader className='mx-auto' />
				)}
			</div>
		</div>
	)
}

export default Page
