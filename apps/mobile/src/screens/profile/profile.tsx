import { useStatisticsWithSync } from '@/screens/profile/useStatisticsWithSync'
import { ScrollLayout, Title } from '@/ui'
import NothingFount from '@/ui/nothing-fount'
import { cn } from '@/utils'
import { Color } from 'global/colors'
import { View } from 'react-native'

const currentDayTitle = () => {
	const days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
	]
	const today = new Date().getDay()

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
				<Title
					weight='bold'
					color='white'
					size='xxl'
					className='mx-auto pb-2 pt-2'>
					{`${statistics.userSteak}-day steak`}
				</Title>
				<Title
					weight='bold'
					color={Color.gray}
					numberOfLines={2}
					size='sm'
					className='pb-4 text-center'>
					{statistics.pepTalk}
				</Title>
				<View className='flex-row items-center justify-between gap-2'>
					{statistics.progressByLastWeek.map(item => (
						<View
							className={cn(
								'pb-2',
								currentDayTitle() === item.day
									? 'border-b-primary  border-b-[1px]'
									: ''
							)}>
							<View
								key={item.day}
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
			</View>
		</ScrollLayout>
	)
}

export default Profile
