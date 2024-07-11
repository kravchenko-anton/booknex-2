import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import GenreElement from '@/components/ui/genre-element'
import { cn } from '@/utils'
import { secureRoutes } from '@/utils/route'
import type { ColumnDef } from '@tanstack/react-table'
import type { CatalogOutputDataInner } from 'global/api-client'
import { getFileUrl } from 'global/api-config'
import { minutesToTime } from 'global/helpers/time-converter'
import Image from 'next/image'
import Link from 'next/link'

export const columns = (): ColumnDef<CatalogOutputDataInner, unknown>[] => [
	{
		id: 'picture',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Picture</p>,
		cell: ({ row }) => (
			<Link href={secureRoutes.bookOverviewRoute(row.original.slug)}>
				<Image
					alt={row.original.title}
					className='z-40 mx-auto cursor-pointer rounded'
					src={getFileUrl(row.original.picture)}
					width={300}
					height={250}
				/>
			</Link>
		)
	},
	{
		id: 'Information',
		header: () => <p className='text-md text-center'>Information</p>,
		cell: ({ row }) => (
			<Link href={secureRoutes.bookOverviewRoute(row.original.slug)}>
				<button className='items-start justify-start text-left'>
					<h3 className='mb-1 text-xl'>{row.original.title}</h3>
					<p>{row.original.author}</p>
				</button>
			</Link>
		)
	},

	{
		id: 'description',
		header: () => <p className='text-md text-center'>Description</p>,
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
		id: 'visible',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Visible</p>,
		cell: ({ row }) => (
			<p className='text-center text-lg font-light'>
				<b
					className={cn(
						'items-center font-bold',
						row.original.isPublic ? 'text-success' : 'text-danger'
					)}>
					{row.original.isPublic ? 'Public' : 'Hidden'}
				</b>
			</p>
		)
	},
	{
		id: 'rating',
		enableHiding: false,
		header: () => <p className='text-md w-[200px] text-center'>Rating</p>,
		cell: ({ row }) => (
			<p className=' text-center text-xl font-light'>
				<b className='text-warning font-bold'>{row.original.rating}</b>
			</p>
		)
	},
	{
		id: 'reading time',
		enableHiding: false,
		header: () => <p className='text-md w-[200px] text-center'>Reading time</p>,
		cell: ({ row }) => (
			<p className=' text-center text-xl font-light'>
				<b
					className={cn(
						'text-center font-bold',
						row.original.readingTime === 0 ? 'text-danger' : 'text-gray'
					)}>
					{minutesToTime(row.original.readingTime)}{' '}
				</b>
			</p>
		)
	},
	{
		id: 'genres',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Genres</p>,
		cell: ({ row }) => (
			<div className=' max-w-[150px] items-center justify-center gap-1'>
				{row.original.genres.map(genre => (
					<GenreElement
						key={genre.slug}
						title={genre.name}
						svgUri={genre.icon}
					/>
				))}
			</div>
		)
	}
]
