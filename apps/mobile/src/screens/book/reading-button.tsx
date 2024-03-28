import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { Button } from '@/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Book } from 'icons'
import type { FC } from 'react'

interface BookReadingButtonProperties {
	slug: string
}

const ReadingButton: FC<BookReadingButtonProperties> = ({ slug }) => {
	const { navigate } = useTypedNavigation()
	const queryClient = useQueryClient()
	const { mutateAsync: startReading, isLoading: startReadingLoading } =
		useMutation({
			mutationKey: ['start-reading', slug],
			mutationFn: (slug: string) => api.user.startReading(slug)
		})

	const startReadingBook = async () => {
		await startReading(slug)
		await queryClient
			.invalidateQueries({
				queryKey: ['user-library']
			})
			.then(() => navigate('Reader', { slug }))
	}

	return (
		<Button
			icon={Book}
			isLoading={startReadingLoading}
			className='flex-1'
			variant='primary'
			size='md'
			onPress={startReadingBook}>
			{startReadingLoading ? 'Loading...' : 'Start Reading'}
		</Button>
	)
}

export default ReadingButton
