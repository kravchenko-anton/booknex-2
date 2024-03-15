import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { Button } from '@/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Text } from 'icons'
import type { FC } from 'react'

const BookReadingButton: FC<{ id: number }> = ({ id }) => {
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
			icon={Text}
			isLoading={startReadingLoading}
			className='flex-1'
			variant='muted'
			size='md'
			onPress={startReadingBook}
		>
			{'Read'}
		</Button>
	)
}

export default BookReadingButton
