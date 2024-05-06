import { Fire } from '@/screens/profile/fire'
import { useStatisticsWithSync } from '@/screens/profile/useStatisticsWithSync'
import { ScrollLayout, Title } from '@/ui'
import NothingFount from '@/ui/nothing-fount'
import { cn } from '@/utils'
import { Color } from 'global/colors'
import { getTimeDate } from 'global/utils/getTimeDate'
import { View } from 'react-native'

const currentDayTitle = () => {
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	]
	const today = getTimeDate().getDay()

	return days[today]
}
const Profile = () => {
	console.log(currentDayTitle())
	const { isLoading, statistics } = useStatisticsWithSync()
	console.log('isLoading', isLoading, 'statistics', statistics)
	if (!statistics)
		return (
			<NothingFount
				text={"There will be your story here, but it's not definite"}
			/>
		)
	return (
		<ScrollLayout className=' px-2'>
			<View className='bg-foreground border-bordered mt-4 rounded-md border-[1px] p-2'>
				<View className='mx-auto mt-4'>
					<Fire isDaySteakComplete={statistics.isDaySteakComplete} />
				</View>
				<Title center weight='bold' color='white' size='xxl' className=' pt-2'>
					{statistics.userSteak} days in a streak
				</Title>

				<Title
					center
					weight='bold'
					color={Color.gray}
					size='md'
					className='mb-4  pt-1'>
					reading daily keeping your progress
				</Title>
				<View className='mx-auto ' />

				<View className='flex-row items-center justify-between gap-2'>
					{statistics.progressByCurrentWeek?.map(item => (
						<View
							key={item.day}
							className={cn(
								'pb-2',
								currentDayTitle() === item.day
									? 'border-b-primary  border-b-[1px]'
									: ''
							)}>
							<View
								className={cn(
									' flex h-[30px] w-[30px] items-center justify-center rounded-full',
									item.isReadMoreThatGoal
										? 'bg-primary'
										: 'border-bordered border-[1px] bg-transparent'
								)}>
								<Title weight='bold' color='white' size='md'>
									{item.day.slice(0, 1)}
								</Title>
							</View>
						</View>
					))}
				</View>
				<View className='mb-4 pt-4'>
					<Title
						weight='bold'
						color={Color.gray}
						numberOfLines={2}
						size='sm'
						className='border-l-bordered border-l-2 pl-2 '>
						bob: “ {statistics.pepTalk} ”
					</Title>
				</View>
			</View>
		</ScrollLayout>
	)
}

export default Profile
