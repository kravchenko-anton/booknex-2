import type { FC } from 'react'
import * as React from 'react'
import ActivityCalendar, { type Activity } from 'react-activity-calendar'

interface ActivityListProperties {
	data: Activity[]
}

type ActivityType = Activity & {
	activities: string[]
}

const ActivityList: FC<ActivityListProperties> = ({ data }) => {
	return (
		<div>
			<h1 className='mb-2 mt-2 text-xl'>Activities</h1>

			<ActivityCalendar
				style={{
					width: '100%'
				}}
				theme={{
					dark: [
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
				}}
				eventHandlers={{
					onClick: () => (activity: ActivityType) => {
						//TODO: сделать групировку по юзерам и чтобы сверху было без юзеров
						alert(activity.activities.join('\n'))
					}
				}}
				maxLevel={10}
				data={data}
			/>
		</div>
	)
}

export default ActivityList
