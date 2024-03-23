import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { Button } from '@/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Book } from 'icons'
import type { FC } from 'react'

interface BookReadingButtonProperties {
	id: number
}

const ReadingButton: FC<BookReadingButtonProperties> = ({ id }) => {
	const { navigate } = useTypedNavigation()
	const queryClient = useQueryClient()
	const { mutateAsync: startReading, isLoading: startReadingLoading } =
		useMutation({
			mutationKey: ['start-reading', id],
			mutationFn: (id: number) => api.user.startReading(id)
		})

	const startReadingBook = async () => {
		await startReading(id)
		await queryClient
			.invalidateQueries({
				queryKey: ['user-library']
			})
			.then(() => navigate('Reader', { id: id }))
	}

	return (
		<Button
			icon={Book}
			isLoading={startReadingLoading}
			className='flex-1'
			variant='primary'
			size='md'
			onPress={startReadingBook}
		>
			{startReadingLoading ? 'Loading...' : 'Start Reading'}
		</Button>
	)
}

export default ReadingButton
