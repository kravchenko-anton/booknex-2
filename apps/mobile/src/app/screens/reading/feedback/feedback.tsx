import { Button, Field, Icon, ScrollView, Title } from '@/components/ui'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { feedbackTags } from '@/screens/reading/feedback/feedback-tags'
import type { SendFeedbackSchemaType } from '@/screens/reading/feedback/validation'
import { bookService } from '@/services/book/book-service'
import { successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { FinishBook } from 'global/illustrations'
import type { FeedbackBookPayload } from 'global/services-types/book-types'
import { Close, Star } from 'icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const Feedback = () => {
	const { params } = useTypedRoute<'Feedback'>()
	const [selectedStars, setSelectedStars] = useState(0)
	const { navigate } = useTypedNavigation()
	const { control, setValue, handleSubmit, watch } =
		useForm<SendFeedbackSchemaType>()

	const selectedTags = watch('selectedTags') || []
	const setSelectedTags = (tags: string[]) => setValue('selectedTags', tags)
	console.log(selectedTags)
	const mappedTags = (
		tags: {
			id: number
			name: string
		}[]
	) => {
		return tags.map(tag => {
			return (
				<Button
					size='sm'
					key={tag.id}
					variant={selectedTags.includes(tag.name) ? 'primary' : 'shade'}
					onPress={() => {
						if (selectedTags.includes(tag.name)) {
							setSelectedTags(
								selectedTags.filter(selectedTag => selectedTag !== tag.name)
							)
						} else {
							setSelectedTags([...selectedTags, tag.name])
						}
					}}
				>
					{tag.name}
				</Button>
			)
		})
	}

	const { mutateAsync: sendFeedback, isLoading } = useMutation(
		['feedback'],
		({ id, dto }: { id: number; dto: FeedbackBookPayload }) =>
			bookService.feedback(id, dto)
	)

	const submitFeedback = async (data: SendFeedbackSchemaType) => {
		await sendFeedback({
			id: params.id,
			dto: {
				rating: selectedStars,
				comment: data.AdditionalComments || 'No comment',
				tags: selectedTags || []
			}
		}).then(() => {
			successToast('Feedback sent successfully')
			navigate('Library')
		})
	}
	return (
		<ScrollView className='h-full'>
			<Icon
				className=' m-2 w-[50px] items-start'
				icon={Close}
				size='md'
				onPress={() => navigate('Library')}
				variant='shade'
			/>
			<FinishBook className='mx-auto' height={200} width={250} />
			<Title className='mt-8 text-center' size={26} weight='bold'>
				Thanks for reading!
			</Title>
			<Title color={Color.gray} className='text-center' weight='regular'>
				Your feedback is important to us
			</Title>
			<View className='w-full items-center justify-center pt-4'>
				<View className=' flex-row items-center gap-5'>
					{[1, 2, 3, 4, 5].map(star => {
						return (
							<Star
								width={35}
								height={35}
								key={star}
								stroke={Color.warning}
								fill={star <= selectedStars ? Color.warning : Color.transparent}
								onPress={() => setSelectedStars(star)}
							/>
						)
					})}
				</View>
			</View>
			{selectedStars > 0 && (
				<View className='w-full items-center justify-center pt-4'>
					<Title size={20} className='mb-2 mt-4 text-center' weight='bold'>
						{`Thanks, Why ${selectedStars > 3 ? 'did' : "didn't"} you like the book?`}
					</Title>
					<View className='mb-2 w-full flex-row flex-wrap items-center justify-center gap-2 pt-4'>
						{selectedStars > 3
							? mappedTags(feedbackTags.positive)
							: mappedTags(feedbackTags.negative)}
					</View>

					<Field
						isArea
						className='mb-4'
						control={control}
						placeholder='Share your thoughts with us here. '
						name='AdditionalComments'
					/>
					<Button
						size='lg'
						isLoading={isLoading}
						variant='primary'
						onPress={handleSubmit(submitFeedback)}
						className='mb-4 w-full'
					>
						Submit
					</Button>
				</View>
			)}
		</ScrollView>
	)
}

export default Feedback
