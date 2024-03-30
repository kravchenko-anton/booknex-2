import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { acceptToast } from '@/utils/toast'
import type { ColumnDef } from '@tanstack/react-table'
import type { AxiosResponse } from 'axios'
import { BookTemplate } from 'global/api-client'
import { getFileUrl } from 'global/api-config'
import { MoreHorizontal } from 'icons'

type ColumnType = ColumnDef<BookTemplate>[]

export const columns = ({
	remove,
	useAsTemplate,
	removeLoading
}: {
	remove: (slug: string) => Promise<AxiosResponse<void, unknown>>
	useAsTemplate: (slug: string) => void
	removeLoading: boolean
}): ColumnType => [
	{
		id: 'picture',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Picture</p>,
		cell: ({ row }) => (
			<img
				alt={row.original.title}
				className='mx-auto w-[60px] cursor-pointer rounded'
				src={getFileUrl(row.original.picture)}
				onClick={() => {
					useAsTemplate(row.original.slug)
				}}
			/>
		)
	},
	{
		id: 'Information',
		header: () => <p className='text-center text-lg'>Information</p>,
		cell: ({ row }) => (
			<div>
				<h3 className='text-xl'>{row.original.title}</h3>
				<p>{row.original.author}</p>
			</div>
		)
	},
	{
		//rating
		id: 'rating',
		header: () => <p className='text-center text-lg'>Rating</p>,
		cell: ({ row }) => (
			<h1 className='text-warning flex items-center justify-center text-lg '>
				{row.original.rating}
			</h1>
		)
	},
	{
		id: 'description',
		header: () => <p className='text-center text-lg'>Description</p>,
		cell: ({ row }) => (
			<Drawer>
				<DrawerTrigger asChild>
					<p className='line-clamp-3'>{row.original.description}</p>
				</DrawerTrigger>
				<DrawerContent>
					<span className='p-6 pb-10 text-justify text-xl'>
						{row.original.description}
					</span>
				</DrawerContent>
			</Drawer>
		)
	},

	{
		id: 'Actions',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger className='focus-visible:outline-0'>
					<MoreHorizontal
						height={40}
						width={40}
						className='bg-muted border-bordered rounded border-[1px] p-2'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						onClick={() => {
							useAsTemplate(row.original.slug)
						}}>
						Use as template
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						disabled={removeLoading}
						onClick={() => {
							acceptToast('Are you sure you want to delete this book?', {
								action: {
									label: 'Delete',

									onClick: async () => {
										await remove(row.original.slug)
									}
								}
							})
						}}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
