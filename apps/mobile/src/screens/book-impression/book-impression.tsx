import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { RatingSelect } from '@/screens/book-impression/rating-select'
import { TagsSelect } from '@/screens/book-impression/tags-select'

import { useAuthStore } from '@/screens/auth/store/auth-store'
import { Button, Field, Icon, ScrollView, Title } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UserFeedback } from '@sentry/react-native'
import * as Sentry from '@sentry/react-native'
import { Color } from 'global/colors'

import { Close } from 'icons'
import { FinishBook } from 'illustrations'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
//TODO: проверить эту страницу

const BookImpression: FC = () => {
	const { params } = useTypedRoute<'BookImpression'>()
	const { navigate } = useTypedNavigation()
	const user = useAuthStore(state => state.user)

	const { control, handleSubmit, watch } = useForm<ReviewBookType>({
		mode: 'onSubmit',
		resolver: zodResolver(ImpressionBookSchema)
	})

	const rating = watch('rating')
	const submitReview = async data => {
		const sentryId = Sentry.captureMessage('feedback' + Math.random())
		const userFeedback: UserFeedback = {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			event_id: sentryId,
			email: user?.email,
			comments: `Tags: ${data.tags.join(', ')}
Rating: ${data.rating} stars
Comment: ${data.comment ?? 'No comment'}
Slug: ${params.slug}`
		}

		await Sentry.captureUserFeedback(userFeedback)
		successToast('Thanks for your feedback!')
		navigate('Library')
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
