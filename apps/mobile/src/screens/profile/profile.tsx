import { GoalSelectModal } from '@/screens/profile/goal-select'
import { useStatisticsWithSync } from '@/screens/profile/useStatisticsWithSync'
import { Button, Loader, ScrollLayout, Title } from '@/ui'
import { CircularProgressBar } from '@/ui/progress-bar/circular-progress-bar'
import { cn } from '@/utils'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Color } from 'global/colors'
import { fromMsToMinutes } from 'global/utils/numberConvertor'
import { useRef } from 'react'
import { View } from 'react-native'

const Profile = () => {
	const sheetReference = useRef<BottomSheetModal>(null)
	const { statistics, refetch } = useStatisticsWithSync()
	if (!statistics) return <Loader />
	console.log(
		statistics.progressByCurrentWeek?.find(item => item.isCurrentDay)
			?.dayProgress || 0,
		'daySteakProgressPercentage'
	)
	return (
		<ScrollLayout className='px-2'>
			<GoalSelectModal
				sheetRef={sheetReference}
				refetch={refetch}
				currentGoal={statistics.goalMinutes || 10}
			/>
			<View className='bg-foreground border-bordered mt-4 rounded-lg border-[1px] p-2'>
				<View className='mx-2 mb-6'>
					<Title center weight='bold' color={Color.white} size='xxl'>
						Daily goal
					</Title>
					<Title
						center
						numberOfLines={2}
						weight='bold'
						color={Color.gray}
						size='sm'>
						Read at least {statistics.goalMinutes || 10} minutes a day to keep
						your progress
					</Title>
				</View>
				<View className='mx-auto -mb-8'>
					<CircularProgressBar
						size={200}
						width={7}
						backgroundWidth={7}
						tintColor={Color.success}
						fillLineCap='round'
						lineCap='round'
						backgroundColor={Color.bordered}
						arcSweepAngle={240}
						rotation={240}
						fill={
							statistics.progressByCurrentWeek?.find(item => item.isCurrentDay)
								?.dayProgress || 0
						}>
						{() => (
							<View className=' -mt-10'>
								<Title
									center
									weight='bold'
									color={Color.white}
									size='xxxl'
									className='mb-0.5'>
									{fromMsToMinutes(
										statistics.progressByCurrentWeek?.find(
											item => item.isCurrentDay
										)?.readingTimeMs || 0
									).toFixed(2)}
								</Title>
								<Title center weight='bold' color={Color.gray} size='sm'>
									of {statistics.goalMinutes || 10} minutes goal
								</Title>
							</View>
						)}
					</CircularProgressBar>
				</View>

				<View className='flex-row items-center justify-between gap-2'>
					{statistics.progressByCurrentWeek?.map(item => (
						<View key={item.day}>
							{item.isCurrentDay ? (
								<CircularProgressBar
									size={32}
									fill={item.dayProgress}
									width={2}
									fillLineCap='round'
									backgroundWidth={2}
									lineCap='round'
									rotation={-90}
									tintColor={item.isCurrentDay ? Color.white : Color.gray}
									backgroundColor={Color.bordered}>
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
							) : (
								<View
									className={cn(
										` h-[32px] w-[32px] flex-row items-center  justify-center rounded-full`,
										item.dayProgress === 100 ? 'bg-success' : 'bg-bordered'
									)}>
									<Title
										className='mb-0.5'
										weight='bold'
										color={Color.white}
										size='sm'>
										{item.day.slice(0, 1)}
									</Title>
								</View>
							)}
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

				<View className='flex-row justify-center'>
					<Button
						variant='foreground'
						className='mb-2'
						size={'sm'}
						onPress={() => sheetReference.current?.present()}>
						Adjust goal
					</Button>
				</View>
			</View>
		</ScrollLayout>
	)
}

export default Profile
