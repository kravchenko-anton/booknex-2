import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { RatingSelect } from '@/screens/book-impression/rating-select'
import { TagsSelect } from '@/screens/book-impression/tags-select'

import { Button, Field, Icon, ScrollView, Title } from '@/ui'
import { successToast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { ReviewBookDto } from 'global/api-client'
import { Color } from 'global/colors'
import { MutationKeys } from 'global/utils/query-keys'
import {
	ImpressionBookSchema,
	type ReviewBookType
} from 'global/validation/impression/impression.book.schema'
import { Close } from 'icons'
import { FinishBook } from 'illustrations'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
//TODO: проверить эту страницу

const BookImpression: FC = () => {
	const { params } = useTypedRoute<'BookImpression'>()
	const { navigate } = useTypedNavigation()
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<ReviewBookType>({
		mode: 'onSubmit',
		resolver: zodResolver(ImpressionBookSchema)
	})
	const rating = watch('rating')
	console.log(errors)
	const { mutateAsync: sendReview, isLoading: reviewLoading } = useMutation({
		mutationKey: MutationKeys.review.sendReview,
		mutationFn: ({ slug, dto }: { slug: string; dto: ReviewBookDto }) =>
			api.review.review(slug, dto)
	})

	const submitReview = async (data: ReviewBookDto) => {
		await sendReview({
			slug: params.slug,
			dto: {
				rating: data.rating,
				comment: data.comment || 'No comment',
				tags: data.tags
			}
		}).then(() => {
			successToast('thanks for impression')
			console.log({
				rating: data.rating,
				comment: data.comment || 'No comment',
				tags: data.tags
			})
			navigate('Library')
		})
	}
	return (
		<ScrollView className='h-full px-2'>
			<View className='items-start'>
				<Icon
					className='mt-2'
					icon={Close}
					size='md'
					variant='muted'
					onPress={() => navigate('Library')}
				/>
			</View>
			<FinishBook className='mx-auto' height={200} width={250} />
			<Title className='mt-8 text-center' size={'xxl'} weight='bold'>
				Thanks for reading!
			</Title>
			<Title color={Color.gray} className='text-center' weight='regular'>
				Your feedback is important to us
			</Title>
			<RatingSelect control={control} name='rating' />
			{rating > 0 && (
				<View className='w-full items-center justify-center'>
					<Title size={'xl'} className='my-1.5 mb-0 text-center' weight='bold'>
						{`Thanks, Why ${rating > 3 ? 'did' : "didn't"} you like the book?`}
					</Title>
					<TagsSelect
						control={control}
						name='tags'
						currentRating={watch('rating')}
					/>

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

export default BookImpression
