import api from '@/services'
import { useUploadFile } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { EBookType, UpdateBookDto } from 'global/api-client'
import { useParams, useRouter } from 'next/navigation'

export const useOverview = () => {
	const { upload } = useUploadFile()
	const parameters = useParams()
	const queryClient = useQueryClient()
	const router = useRouter()
	const id = Number(parameters.id)
	//TODO: полностью переписать  чтобы было всё вынесенно в бекенд и не было багов, так-же всё было оптимизированно

	console.log(id, 'it is id')
	const { data: book } = useQuery({
		queryKey: ['book-overview', id],
		queryFn: () => api.book.infoByIdAdmin(id),
		select: data => data.data
	})
	const { mutateAsync: update } = useMutation({
		mutationKey: ['update-book'],
		mutationFn: ({ id, payload }: { id: number; payload: UpdateBookDto }) =>
			api.book.update(id, payload),
		onSuccess: async () => {
			successToast('Book updated')
			await queryClient.invalidateQueries({
				queryKey: ['book-overview', id]
			})
		}
	})

	const updatePicture = async (file: File) => {
		if (!book) return errorToast('Book not found')
		const { data: picture } = await upload({
			blob: file,
			name: book.title,
			folder: 'booksCovers'
		})
		if (!picture) return errorToast('Picture not uploaded')
		await update({
			id,
			payload: {
				picture: picture.name
			}
		})
		await queryClient.invalidateQueries({
			queryKey: ['book-overview', id]
		})
	}

	const { mutateAsync: updateEbook } = useMutation({
		mutationKey: ['update-picture'],
		mutationFn: ({ id, payload }: { id: number; payload: EBookType[] }) =>
			api.book.updateEbook(id, payload),
		onSuccess: async () => {
			successToast('Book updated')
			await queryClient.invalidateQueries({
				queryKey: ['book-overview', id]
			})
		}
	})

	const { mutateAsync: remove } = useMutation({
		mutationKey: ['remove-book'],
		mutationFn: (id: number) => api.book.remove(id),
		onSuccess: () => {
			successToast('Book removed')
			router.push('/admin/books')
		}
	})

	const toggleVisibility = async () => {
		if (!book) return errorToast('Book not found')
		await update({
			id,
			payload: {
				visible: !book.visible
			}
		})
		await queryClient.invalidateQueries({
			queryKey: ['book-overview', id]
		})
	}
	return {
		book,
		update,
		remove,
		updateEbook,
		updatePicture,
		toggleVisibility
	}
}
