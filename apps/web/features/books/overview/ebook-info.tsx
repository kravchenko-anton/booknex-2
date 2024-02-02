import Editor from '@/features/books/shared/editor'
import type { EbookType } from '@/features/books/shared/useBookCompose'
import { useBookCompose } from '@/features/books/shared/useBookCompose'
import { Button, DropZone } from '@/shared/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { errorToast } from '@/shared/utils/toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getFileUrl } from 'global/api-config'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

const ebookValidator = z
	.array(
		z
			.object({
				name: z.string().refine(value => !value.includes('epub'), {
					message: 'Book name can not include "epub"'
				}),
				content: z
					.array(
						z.object({
							title: z.string(),
							content: z.string()
						})
					)
					.min(1)
			})
			.refine(value => value.name.length > 0, {
				message: 'File is required'
			})
	)
	.min(1)

interface EbookInfoProperties {
	bookLink: string
	onEdit: (books: EbookType[]) => void
}

const EbookInfo: FC<EbookInfoProperties> = ({ bookLink, onEdit }) => {
	const { data: ebook } = useQuery({
		queryKey: ['book-preview', bookLink],
		queryFn: () =>
			axios
				.get<EbookType[]>(getFileUrl(bookLink))
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
							__html: ebook.map(({ content }) =>
								content
									.map(
										({ title, content }) =>
											`<label id="${title}"></label> ${content}`
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
						onFileDelete={file =>
							books.delete({
								name: file.name
							})
						}
					/>
					{books.state && (
						<div
							className={twMerge(
								'mt-8 gap-2',
								books.state.length > 1 && 'grid grid-cols-2'
							)}
						>
							<Editor {...books} />
						</div>
					)}
					<Button
						size='md'
						variant='primary'
						onClick={() => {
							ebookValidator
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
