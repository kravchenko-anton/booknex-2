import { Button } from '@/components/ui'
import api from '@/services/api'
import { cn } from '@/utils'
import { secureRoutes } from '@/utils/route'
import { acceptToast, successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import type { FunctionType } from 'global/types'
import { MutationKeys } from 'global/utils/query-keys'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

interface BookVisibleButtonProperties {
	slug: string
	onSuccess: FunctionType
}
export const RemoveButton: FC<BookVisibleButtonProperties> = properties => {
	const router = useRouter()
	const { mutateAsync: remove, isPending: removeLoading } = useMutation({
		mutationKey: MutationKeys.book.removeBook,
		mutationFn: (slug: string) => api.book.remove(slug),
		onSuccess: () => {
			successToast('Book removed')
			router.push(secureRoutes.bookCatalogRoute)
		}
	})
	return (
		<Button
			size={'sm'}
			isLoading={removeLoading}
			className={cn('bg-danger rounded text-white')}
			onClick={() =>
				acceptToast('Are you sure you want to delete this book?', {
					action: {
						label: 'Delete',
						onClick: () => remove(properties.slug)
					}
				})
			}>
			Remove
		</Button>
	)
}
