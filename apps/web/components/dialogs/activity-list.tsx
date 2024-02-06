import { SheetComponent, SheetHeader } from '@/components/ui/sheet'
import type { ActivitiesOutput } from 'backend/src/utils/activity-transformer'
import type { FC } from 'react'
import * as React from 'react'
import ActivityCalendar from 'react-activity-calendar'
import { twMerge } from 'tailwind-merge'

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
//TODO: сделать тут попап с обображением всех активностей в виде логов

const ActivityList: FC<{
	data: ActivitiesOutput[]
}> = ({ data = [] }) => {
	const [activity, setActivity] = React.useState<ActivitiesOutput | null>(null)
	const onActivityClick = active => {
		setActivity(active)
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
					onClick: () => onActivityClick
				}}
			/>
			<SheetComponent isOpen={!!activity} onClose={() => setActivity(null)}>
				<SheetHeader className='pb-2'>
					<h1 className='text-3xl font-medium'>
						Activities: {new Date(activity?.date).toLocaleDateString()}
					</h1>
				</SheetHeader>
				<div className='no-scrollbar h-[95%] w-full overflow-y-scroll'>
					{activity?.activities.map(activity => (
						<p
							key={activity.time}
							className={twMerge('text-success  font-mono text-lg')}
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
			</SheetComponent>
		</>
	)
}

export default ActivityList
