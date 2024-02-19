import { SheetComponent, SheetHeader } from '@/components/ui/sheet'
import { cn } from '@/utils'
import type { ActivitiesOutput } from 'backend/src/utils/activity-transformer'
import * as React from 'react'
import { useState, type FC } from 'react'
import ActivityCalendar from 'react-activity-calendar'

const activityPalette = [
	'hsl(0, 0%, 20%)',
	'hsl(0, 0%, 30%)',
	'hsl(0, 0%, 40%)',
	'hsl(0, 0%, 60%)',
	'hsl(0, 0%, 80%)',
	'#7DB9B6',
	'#E96479',
	'#E33B54',
	'#D61F3A',
	'#B31930',
	'#A1172C'
]

const ActivityList: FC<{
	data: ActivitiesOutput[]
}> = ({ data = [] }) => {
	const [selectActivity, setSelectActivity] = useState<ActivitiesOutput | null>(
		null
	)
	const onActivityClick = (active: ActivitiesOutput) => {
		if (active.level === 0) return
		setSelectActivity(active)
	}
	return (
		<>
			<h1 className='mb-2 mt-2 text-xl'>Activities</h1>
			<ActivityCalendar
				maxLevel={10}
				data={data}
				style={{
					width: '100%',
					minWidth: '600px'
				}}
				theme={{
					dark: activityPalette
				}}
				eventHandlers={{
					// @ts-ignore because by default it return Activity only but me need activities
					onClick: () => onActivityClick
				}}
			/>
			<SheetComponent
				isOpen={!!selectActivity}
				onClose={() => setSelectActivity(null)}
			>
				{selectActivity ? (
					<>
						<SheetHeader className='pb-2'>
							<h1 className='text-3xl font-medium'>
								Activities: {new Date(selectActivity.date).toLocaleDateString()}
							</h1>
						</SheetHeader>
						<div className='no-scrollbar h-[95%] w-full overflow-y-scroll'>
							{selectActivity.activities?.map(activity => (
								<p
									key={activity.time}
									className={cn('text-success  font-mono text-lg')}
								>
									<b className='text-gray'>[{activity.time}]</b>{' '}
									<b
										className='font-mono'
										style={{
											color: activityPalette[activity.importance]
										}}
									>
										[{activity.importance}]
									</b>{' '}
									{activity.message}
								</p>
							))}
						</div>
					</>
				) : (
					<div>Nothing selected</div>
				)}
			</SheetComponent>
		</>
	)
}

export default ActivityList
