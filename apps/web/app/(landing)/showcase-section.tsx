'use client'
import { publicRoutes } from '@/utils/route'
import { getFileUrl } from 'global/api-config'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// String url need pass to this function

export interface PicksOfWeekListProperties {
	picksOfTheWeek: {
		picture: string
		slug: string
	}[]
}
export const ShowcaseSection = (properties: PicksOfWeekListProperties) => {
	const router = useRouter()
	return (
		<div className='w-full py-4'>
			<div className=' mx-auto px-2 md:w-4/5 md:px-0'>
				<h1 className='mb-4 text-2xl'>Picks of the week</h1>
				<div
					id='picks of weeks'
					className='flex h-[240px] justify-between gap-5 overflow-y-scroll px-2 pb-2'>
					{properties.picksOfTheWeek?.map(book => (
						<Image
							src={getFileUrl(book.picture)}
							alt={'book'}
							className='bg-foreground border-bordered h-full cursor-pointer rounded-md border-2'
							width={150}
							height={150}
							onClick={() => router.push(publicRoutes.bookBySlug(book.slug))}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
