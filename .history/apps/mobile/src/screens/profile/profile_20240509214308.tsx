import { Fire } from '@/screens/profile/fire'
import { useStatisticsWithSync } from '@/screens/profile/useStatisticsWithSync'
import { Loader, ScrollLayout, Title } from '@/ui'
import NothingFount from '@/ui/nothing-fount'
import { CircularProgressBar } from '@/ui/progress-bar/circular-progress-bar'
import { cn } from '@/utils'
import { Color } from 'global/colors'
import { getTimeDate } from 'global/utils'
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
//TODO: сделать adjust goal в каком-то виде
const Profile = () => {
	const { isLoading, statistics } = useStatisticsWithSync()
	if (isLoading) return <Loader />
	if (!statistics)
		return (
			<NothingFount
				text={"There will be your story here, but it's not definite"}
			/>
		)
	console.log(
		statistics.daySteakProgressPercentage || 0,
		'daySteakProgressPercentage'
	)

	return (
		<ScrollLayout className=' px-2'>
			<View className='bg-foreground border-bordered mt-4 rounded-lg border-[1px] p-2'>
				<View className='mx-auto mt-4'>
					<Fire progress={statistics.daySteakProgressPercentage || 0} />
				</View>
				<Title center weight='bold' color='white' size='xxl' className=' pt-2'>
					{statistics.userSteak} days in a streak
				</Title>

				<Title
					center
					weight='bold'
					color={Color.gray}
					size='md'
					numberOfLines={2}
					className='mb-4  pt-1'>
					reading daily ({statistics.goalMinutes || 10}m) keeping your progress
				</Title>

				<View className='flex-row items-center justify-between gap-2'>
					{statistics.progressByCurrentWeek?.map(item => (
						<View
							key={item.day}
							className={cn(
								'pb-2',
								currentDayTitle() === item.day
									? 'border-b-primary  border-b-[2px]'
									: ''
							)}>
							<CircularProgressBar
								size={32}
								style={item.dayProgress === 0 ? { opacity: 0.5 } : {}}
								fill={item.dayProgress || 0}
								backgroundColor={Color.gray}
								tintColor={Color.primary}
								width={2}
								fillLineCap='round'
								backgroundWidth={2}
								lineCap='round'
								rotation={-90}>
								{() => (
									<Title
										weight='bold'
										color='white'
										size='sm'
										className='mb-0.5'>
										{item.day.slice(0, 1)}
									</Title>
								)}
							</CircularProgressBar>
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
