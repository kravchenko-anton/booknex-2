import { Button } from '@/components/ui'
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
import { getFileUrl } from 'global/api-config'
import { nFormatter } from 'global/helpers/number-formater'
import { MoreHorizontal } from 'icons'
import * as React from 'react'

type ColumnType = ColumnDef<{
	id: number
	title: string
	author: string
	picture: string
	description: string
	pages: number
	popularity: number
	genres: { name: string }[]
}>[]

export const columns = ({
	remove,
	useAsTemplate
}: {
	remove: (id: number) => Promise<AxiosResponse<void, any>>
	useAsTemplate: (id: number) => void
}): ColumnType => [
	{
		id: 'id',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>id</p>,
		cell: ({ row }) => <p className='text-2xl'>{row.original.id}</p>
	},
	{
		id: 'picture',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Picture</p>,
		cell: ({ row }) => (
			<img
				alt={row.original.title}
				className=' mx-auto w-[100px] rounded-xl'
				src={getFileUrl(row.original.picture)}
			/>
		)
	},
	{
		id: 'Information',
		header: () => <p className='text-center text-xl'>Information</p>,
		cell: ({ row }) => (
			<div className='w-[250px]'>
				<h3 className='text-xl'>{row.original.title}</h3>
				<p>{row.original.author}</p>
				<div className='flex flex-wrap gap-2'>
					<p className='bg-foreground mt-2 rounded-xl p-1.5 font-light'>
						<b className='font-bold text-white'>{row.original.pages}</b> pages
					</p>
					<p className='bg-foreground mt-2 rounded-xl p-1.5 font-light'>
						<b className='font-bold text-white'>
							{nFormatter(row.original.popularity)}{' '}
						</b>{' '}
						popularity
					</p>
				</div>
			</div>
		)
	},
	{
		id: 'description',
		header: () => <p className='text-center text-xl'>Description</p>,
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
		id: 'genres',
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => (
			<div className='flex flex-wrap items-center justify-center'>
				{row.original.genres.map(genre => (
					<Button variant='muted' className='m-0.5' size='sm' key={genre.name}>
						{genre.name}
					</Button>
				))}
			</div>
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
						className='bg-muted border-bordered rounded-xl border-2 p-2'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						onClick={() => {
							useAsTemplate(row.original.id)
						}}
					>
						Use as template
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() =>
							acceptToast('Are you sure you want to delete this book?', {
								action: {
									label: 'Delete',
									onClick: () => remove(row.original.id)
								}
							})
						}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
