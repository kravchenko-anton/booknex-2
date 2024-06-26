import type { FullBookCount } from 'global/api-client'
import { minutesToTime } from 'global/helpers/time-converter'
import { getTimeDate } from 'global/utils'
import type { FC } from 'react'

interface InfoBlockProperties {
	_count: FullBookCount
	createdAt: string
	updatedAt: string
	readingTime: number
}

const BookStatistic: FC<InfoBlockProperties> = ({
	_count,
	createdAt,
	readingTime,
	updatedAt
}) => (
	<div className='border-foreground my-2 border-[1px] p-2'>
		<p className='border-bordered text-md mb-1 border-b-2 pb-1'>
			reading Time:
			<b className='text-white'> {minutesToTime(readingTime)}</b>
		</p>
		<p className='text-md mb-1'>
			finished By:
			<b className='text-white'> {_count.finishedBy}</b>
		</p>
		<p className='text-md mb-1'>
			saved By: <b className='text-white'> {_count.savedBy}</b>
		</p>

		<p className='text-md border-bordered text-md mb-1 border-b-2 pb-1'>
			reading By:
			<b className='text-white'> {_count.readingBy}</b>
		</p>

		<p className='text-md mb-1'>
			create At:
			<b className='text-white'>
				{' ' + getTimeDate(createdAt).toLocaleDateString()}
			</b>
		</p>
		<p className='text-md'>
			update At:
			<b className='text-white'>
				{' ' + getTimeDate(updatedAt).toLocaleDateString()}
			</b>
		</p>
	</div>
)

export default BookStatistic
