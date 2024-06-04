import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { Button } from '@/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'
import { Book } from 'icons'
import type { FC } from 'react'

interface BookReadingButtonProperties {
	slug: string
}

const ReadingButton: FC<BookReadingButtonProperties> = ({ slug }) => {
	const { navigate } = useTypedNavigation()
	const queryClient = useQueryClient()
	const { mutateAsync: startReading, isPending: startReadingLoading } =
		useMutation({
			mutationKey: MutationKeys.book.startReadingBySlug(slug),
			mutationFn: (slug: string) => api.user.startReading(slug)
		})

	const startReadingBook = async () => {
		await startReading(slug)
		await queryClient
			.invalidateQueries({
				queryKey: QueryKeys.library
			})
			.then(() => navigate('Reader', { slug, initialScrollPosition: 0 }))
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
