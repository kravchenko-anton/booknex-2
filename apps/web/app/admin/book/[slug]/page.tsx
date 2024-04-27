'use client'
import BookStatistic from '@/app/admin/book/_components/book-statistic'
import BookOverview from '@/app/admin/book/_components/ebook-tabs'
import { RemoveButton } from '@/app/admin/book/_components/remove-button'
import ReviewTable from '@/app/admin/book/_components/review/review-table'
import ActivityList from '@/components/activity-list'
import { Button } from '@/components/ui'
import GenreElement from '@/components/ui/genre-element'
import Loader from '@/components/ui/loader/loader'
import api from '@/services/api'
import { cn } from '@/utils'
import { secureRoutes } from '@/utils/route'
import { validateStringParameter } from '@/utils/validate-parameter'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getFileUrl } from 'global/api-config'
import { QueryKeys } from 'global/utils/query-keys'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

const Page = () => {
	const router = useRouter()
	const parameters = useParams()
	const queryClient = useQueryClient()

	const slug = validateStringParameter(parameters.slug)

	const { data: book } = useQuery({
		queryKey: QueryKeys.book.overview.bySlug(slug),
		queryFn: () => api.book.adminInfoBySlug(slug),
		select: data => data.data
	})
	const onUpdateSuccess = async () => {
		await queryClient.invalidateQueries({
			queryKey: QueryKeys.book.overview.bySlug(slug)
		})
	}

	if (!book) return <Loader />

	return (
		<div>
			<h1 className='text-3xl'>Book overview</h1>
			<div className='mt-4 gap-5 px-2 md:flex'>
				<div>
					<div className='mt-4 px-0.5'>
						<Image
							width={240}
							height={140}
							alt={book.title}
							src={getFileUrl(book.picture)}
							className='bg-muted mb-2 rounded'
						/>
						<BookStatistic
							readingTime={book.readingTime}
							createdAt={book.createdAt}
							_count={book._count}
							updatedAt={book.updatedAt}
						/>
						<div className='mb-4 flex gap-2 md:mt-0'>
							<Button
								size={'sm'}
								className={cn('bg-warning rounded text-white')}
								onClick={() => router.push(secureRoutes.bookUpdateRoute(slug))}>
								Edit
							</Button>
							<RemoveButton slug={book.slug} onSuccess={onUpdateSuccess} />
						</div>
					</div>
				</div>

				<div className='md:w-5/6'>
					<div className='flex items-center gap-5'>
						<h1 className='mb-1 text-3xl'>{book.title}</h1>
						<div className='flex items-center gap-2'>
							<p className='text-warning  text-lg'>★ {book.rating}</p>
						</div>
					</div>

					<h1 className='text-gray text-xl'>{book.author}</h1>
					<h4 className='mb-2 mt-4 text-lg font-bold'>Genres</h4>
					<div className='text-gray mb-8 flex items-center gap-2 overflow-auto'>
						{book.genres.map(genre => (
							<GenreElement title={genre.name} svgUri={genre.icon} />
						))}
					</div>
					<p className='mb-2 text-lg'>{book.description}</p>

					<ActivityList data={book.activities} />

					<BookOverview bookSlug={book.slug} />
					<ReviewTable review={book.review} />
				</div>
			</div>
		</div>
	)
}
export default Page
