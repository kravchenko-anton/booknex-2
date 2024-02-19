import { Button, DropZone } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useBookCompose } from '@/features/books/book-compose/useBookCompose'
import { ebookValidation } from '@/features/books/ebook-validation'
import { cn } from '@/utils'
import { errorToast } from '@/utils/toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { EBookType } from 'backend/src/book/types'
import { getFileUrl } from 'global/api-config'
import type { FC } from 'react'

interface EbookInfoProperties {
	bookLink: string
	onEdit: (books: EBookType) => void
}

const EbookInfo: FC<EbookInfoProperties> = ({ bookLink, onEdit }) => {
	const { data: ebook } = useQuery({
		queryKey: ['book-preview', bookLink],
		queryFn: () =>
			axios
				.get<EBookType>(getFileUrl(bookLink))
				.then(response => response.data),
		enabled: !!bookLink
	})
	const { books } = useBookCompose(ebook)
	if (!ebook) return null
	return (
		<Tabs defaultValue='preview' className=' mt-8 w-full '>
			<TabsList>
				<TabsTrigger value='preview'>Preview Ebook</TabsTrigger>
				<TabsTrigger value='edit'>Edit</TabsTrigger>
			</TabsList>
			<div className=' border-muted mt-4 border-[1px] p-2'>
				<TabsContent value='preview'>
					<p
						className='mb-4 h-[700px] w-full overflow-y-scroll'
						dangerouslySetInnerHTML={{
							__html: ebook.map(({ chapters }) =>
								chapters
									.map(
										({ name, text }) => `<label id="${name}"></label> ${text}`
									)
									.join(' ')
							)
						}}
					/>
				</TabsContent>
				<TabsContent value='edit'>
					<DropZone
						multiple
						size='sm'
						accept='.epub'
						onDropFile={books.upload}
						onFileDelete={file => books.delete(file.name)}
					/>
					{books.state && (
						<div
							className={cn(
								'mt-8 gap-2',
								books.state.length > 1 && 'grid grid-cols-2'
							)}
						>
							{
								//TODO: переделать тут
							}
							{/* <Editor {...books} /> */}
						</div>
					)}
					<Button
						size='md'
						variant='primary'
						onClick={() => {
							ebookValidation
								.parseAsync(books.state)
								.then(value => onEdit(value as any))
								.catch(error => {
									errorToast(error)
								})
						}}
					>
						Save
					</Button>
				</TabsContent>
			</div>
		</Tabs>
	)
}

export default EbookInfo
