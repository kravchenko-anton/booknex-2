import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import {
	ReviewValidation,
	ReviewValidationType
} from '@/screens/book-review/book-review.dto.ts'
import { Button, Field, Icon, ScrollView, Title } from '@/ui'
import { successToast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ReviewBookDto } from 'global/api-client'
import { Color } from 'global/colors'
import { reviewTags } from 'global/utils/review-tags'
import { Close, Star } from 'icons'
import { FinishBook } from 'illustrations'
import { useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
//TODO: проверить эту страницу

const BookReview: FC = () => {
	const { params } = useTypedRoute<'BookReview'>()
	const [selectedStars, setSelectedStars] = useState(0)
	const { navigate } = useTypedNavigation()
	const { control, setValue, handleSubmit, watch } =
		useForm<ReviewValidationType>({
			mode: 'onSubmit',
			resolver: zodResolver(ReviewValidation)
		})

	const selectedTags = watch('tags') || []
	const setSelectedTags = (tags: string[]) => setValue('tags', tags)
	const mappedTags = (
		tags: {
			id: number
			name: string
		}[]
	) =>
		tags.map(tag => (
			<Button
				size='sm'
				key={tag.id}
				variant={selectedTags.includes(tag.name) ? 'primary' : 'muted'}
				onPress={() => {
					if (selectedTags.includes(tag.name)) {
						setSelectedTags(
							selectedTags.filter(selectedTag => selectedTag !== tag.name)
						)
					} else {
						setSelectedTags([...selectedTags, tag.name])
					}
				}}>
				{tag.name}
			</Button>
		))

	const { mutateAsync: sendReview, isPending: reviewLoading } = useMutation({
		mutationKey: ['send-review'],
		mutationFn: ({ slug, dto }: { slug: string; dto: ReviewBookDto }) =>
			api.review.review(slug, dto)
	})

	const submitReview = async (data: ReviewBookDto) => {
		await sendReview({
			slug: params.slug,
			dto: {
				rating: selectedStars,
				comment: data.comment || 'No comment',
				tags: selectedTags || []
			}
		}).then(() => {
			successToast('thanks for review')
			navigate('Library')
		})
	}
	return (
		<ScrollView className='h-full px-2'>
			<Icon
				className='mt-2 w-[45px] items-start'
				icon={Close}
				size='md'
				variant='muted'
				onPress={() => navigate('Library')}
			/>
			<FinishBook className='mx-auto' height={200} width={250} />
			<Title className='mt-8 text-center' size={'xxl'} weight='bold'>
				Thanks for reading!
			</Title>
			<Title color={Color.gray} className='text-center' weight='regular'>
				Your feedback is important to us
			</Title>
			<View className='w-full items-center justify-center pt-4'>
				<View className=' flex-row items-center gap-5'>
					{[1, 2, 3, 4, 5].map(star => (
						<Star
							width={35}
							height={35}
							key={star}
							stroke={Color.warning}
							fill={star <= selectedStars ? Color.warning : Color.transparent}
							onPress={() => setSelectedStars(star)}
						/>
					))}
				</View>
			</View>
			{selectedStars > 0 && (
				<View className='w-full items-center justify-center pt-4'>
					<Title size={'xl'} className='mb-2 mt-4 text-center' weight='bold'>
						{`Thanks, Why ${selectedStars > 3 ? 'did' : "didn't"} you like the book?`}
					</Title>
					<View className='mb-2 w-full flex-row flex-wrap items-center justify-center gap-2 pt-4'>
						{selectedStars > 3
							? mappedTags(reviewTags.positive)
							: mappedTags(reviewTags.negative)}
					</View>

					<Field
						isArea
						className='mb-4'
						control={control}
						placeholder='Share your thoughts with us here. '
						name='comment'
					/>
					<Button
						size='lg'
						isLoading={reviewLoading}
						variant='primary'
						className='mb-4 w-full'
						onPress={handleSubmit(submitReview)}>
						Submit
					</Button>
				</View>
			)}
		</ScrollView>
	)
}

export default BookReview
