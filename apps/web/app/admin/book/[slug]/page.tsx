'use client'
import BookStatistic from '@/app/admin/book/_components/book-statistic'
import { ActivityChart } from '@/app/admin/book/_components/charts/activity-chart'
import BookOverview from '@/app/admin/book/_components/ebook-tabs'
import { RemoveButton } from '@/app/admin/book/_components/remove-button'
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
		select: data => data.data,
		// 1 hour
		staleTime: 1000 * 60 * 60
	})
	const onUpdateSuccess = async () => {
		await queryClient.invalidateQueries({
			queryKey: QueryKeys.book.overview.bySlug(slug)
		})
	}

	if (!book) return <Loader />

	return (
		<div>
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
					<h1 className='mb-1 text-3xl'>{book.title}</h1>

					<div className='flex items-center gap-5'>
						<h1 className='text-gray text-xl'>{book.author.name}</h1>
						<div className='flex items-center gap-2'>
							<p className='text-warning  text-lg'>★ {book.rating}</p>
						</div>
					</div>
					<div className='text-gray mb-2 mt-4 flex items-center gap-2 overflow-auto'>
						{book.genres.map(genre => (
							<GenreElement
								title={genre.name}
								key={genre.slug}
								svgUri={genre.icon}
							/>
						))}
					</div>
					<p className='mb-2 text-lg'>{book.description}</p>
					<ActivityChart
						chartData={book.statistics?.map(history => ({
							...history,
							readingTimeMin: Math.round(history.readingTimeMs / 60_000) || 0,
							name: new Date(history.endDate).toLocaleDateString(),
							date: new Date(history.endDate).toLocaleDateString()
						}))}
					/>
				</div>
			</div>
			<BookOverview bookSlug={book.slug} />
		</div>
	)
}
export default Page
