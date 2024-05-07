import { Fire } from '@/screens/profile/fire'
import { useStatisticsWithSync } from '@/screens/profile/useStatisticsWithSync'
import { Loader, ScrollLayout, Title } from '@/ui'
import NetworkError from '@/ui/no-network-connection'
import NothingFount from '@/ui/nothing-fount'
import { cn } from '@/utils'
import { useNetInfo } from '@react-native-community/netinfo'
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
	const { isConnected } = useNetInfo()
	const { isLoading, statistics } = useStatisticsWithSync()
	if (isLoading) return <Loader />
	if (!statistics)
		return (
			<NothingFount
				text={"There will be your story here, but it's not definite"}
			/>
		)
	if (!isConnected) return <NetworkError />
	return (
		<ScrollLayout className=' px-2'>
			{/*<GoalSelectModal sheetRef={adjustGoalref} />*/}
			<View className='bg-foreground border-bordered mt-4 rounded-md border-[1px] p-2'>
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
							<View
								className={cn(
									' flex h-[32px] w-[32px] items-center justify-center rounded-full',
									item.isReadMoreThatGoal
										? 'bg-primary'
										: 'border-bordered border-[2px] bg-transparent'
								)}>
								<Title weight='bold' color='white' size='md'>
									{item.day.slice(0, 1)}
								</Title>
							</View>
						</View>
					))}
				</View>

				{/*<View className='mx-auto mt-4'>*/}
				{/*	<Pressable*/}
				{/*		className='flex-row items-center gap-1'*/}
				{/*		onPress={() => {*/}
				{/*			adjustGoalref.current?.present()*/}
				{/*		}}>*/}
				{/*		/!*TODO: сделать тут попап на открытие*!/*/}
				{/*		<Title*/}
				{/*			weight='bold'*/}
				{/*			color={Color.gray}*/}
				{/*			numberOfLines={2}*/}
				{/*			size='md'*/}
				{/*			className='mb-[3px]'>*/}
				{/*			Adjust goal*/}
				{/*		</Title>*/}
				{/*		<ChevronRight width={20} height={20} color={Color.white} />*/}
				{/*	</Pressable>*/}
				{/*</View>*/}
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
