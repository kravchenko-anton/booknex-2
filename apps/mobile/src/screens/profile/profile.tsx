import { useStatisticsWithSync } from '@/screens/profile/useStatisticsWithSync'
import { Loader, ScrollLayout, Title } from '@/ui'
import NothingFount from '@/ui/nothing-fount'
import { CircularProgressBar } from '@/ui/progress-bar/circular-progress-bar'
import { cn } from '@/utils'
import { Color } from 'global/colors'
import { View } from 'react-native'

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
		<ScrollLayout className='px-2'>
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
						fill={54}
						tintColor={Color.success}
						fillLineCap='round'
						lineCap='round'
						backgroundColor={Color.bordered}
						arcSweepAngle={240}
						rotation={240}>
						{() => (
							<View className=' -mt-10'>
								<Title
									center
									weight='bold'
									color={Color.white}
									size='xxxl'
									className='mb-0.5'>
									{(
										((statistics.daySteakProgressPercentage || 0) / 100) *
										(statistics.goalMinutes || 10)
									)
										.toFixed(2)
										.replace('.', ':')}
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
						<View
							key={item.day}
							className={cn(
								'pb-2',
								item.isCurrentDay ? 'border-b-primary  border-b-[2px]' : ''
							)}>
							{item.dayProgress === 100 ? (
								<View className='bg-primary h-[32px] w-[32px]'>
									<Title
										weight='bold'
										color={Color.white}
										size='sm'
										className='text-center'>
										{item.day}
									</Title>
								</View>
							) : (
								<CircularProgressBar
									size={32}
									style={item.dayProgress === 0 ? { opacity: 0.5 } : {}}
									fill={item.dayProgress / 100 || 0}
									backgroundColor={Color.gray}
									width={2}
									fillLineCap='round'
									backgroundWidth={2}
									lineCap='round'
									rotation={-90}
									tintColor={item.isCurrentDay ? Color.primary : Color.white}>
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
			</View>
		</ScrollLayout>
	)
}

export default Profile
