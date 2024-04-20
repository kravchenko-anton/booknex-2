'use client'
import { getFileUrl } from 'global/api-config'
import Image from 'next/image'

// String url need pass to this function

export interface PicksOfWeekListProperties {
	picksOfTheWeek: string[]
}
export const ShowcaseSection = (properties: PicksOfWeekListProperties) => (
	<div className='w-full py-4'>
		<div className=' mx-auto px-2 md:w-4/5 md:px-0'>
			<h1 className='mb-4 text-2xl'>Picks of the week</h1>
			<div
				id='picks of weeks'
				className='flex h-[240px] justify-between gap-5 overflow-y-scroll px-2 pb-2'>
				{properties.picksOfTheWeek?.map(source => (
					<Image
						src={getFileUrl(source)}
						alt={'book'}
						className='bg-foreground rounded-md'
						width={150}
						height={150}
					/>
				))}
			</div>
		</div>
	</div>
)
