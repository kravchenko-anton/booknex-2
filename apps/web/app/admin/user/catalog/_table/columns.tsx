import { Button } from '@/components/ui'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import GenreElement from '@/components/ui/genre-element'
import { acceptToast, infoToast } from '@/utils/toast'
import type { ColumnDef } from '@tanstack/react-table'
import type { UserCatalogOutputDataInner } from 'global/api-client'
import { getFileUrl } from 'global/api-config'
import { Color } from 'global/colors'
import { timeAgo } from 'global/helpers/time-format'
import { getTimeDate } from 'global/utils'
import { MoreHorizontal } from 'icons'
import { NothingFound } from 'illustrations'
import {
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

export const columns = ({
	remove,
	removeLoading
}: {
	remove: (id: number) => void
	removeLoading: boolean
}): ColumnDef<UserCatalogOutputDataInner, unknown>[] => [
	{
		id: 'id',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>id</p>,
		cell: ({ row }) => <p className='text-center text-2xl'>{row.original.id}</p>
	},
	{
		id: 'picture',
		header: () => <p className='text-center text-lg'>Picture</p>,
		enableHiding: false,
		cell: ({ row }) => (
			<img
				alt={row.original.email}
				src={getFileUrl(row.original.picture || 'fallback.png')}
				width={50}
				height={50}
				className=' mx-auto h-[60px] w-[60px] rounded-md'
			/>
		)
	},
	{
		id: 'Bio',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Info</p>,
		cell: ({ row }) => (
			<div className=' gap-4'>
				<h2 className='text-lg'>{row.original.fullName}</h2>
				<p className='text-xm'>{row.original.email}</p>
				<p className='text-xm'> {row.original.socialId}</p>
				<p>
					location: <b className='font-bold'> {row.original.location}</b>
				</p>
			</div>
		)
	},
	{
		id: 'Joined at',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Joined at</p>,
		cell: ({ row }) => (
			<div className='text-center'>
				<p>{timeAgo(getTimeDate(row.original.createdAt))}</p>
			</div>
		)
	},

	{
		id: 'Activities',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Activities</p>,
		cell: ({ row }) => (
			<div className='flex items-center justify-center'>
				<Drawer>
					<DrawerTrigger>
						<Button
							size={'md'}
							className='mx-auto'
							variant={
								row.original.statistics.length > 0 ? 'primary' : 'muted'
							}>
							{` ${row.original.statistics.length} Activities `}
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						{row.original.statistics.length > 0 ? (
							<div className='mb-8'>
								<ResponsiveContainer width='100%' height={150}>
									<LineChart
										height={150}
										width={800}
										data={row?.original.statistics.map(history => ({
											...history,
											readingTimeMin:
												Math.round(history.readingTimeMs / 60_000) || 0,
											name: getTimeDate(history.endDate).toLocaleDateString()
										}))}
										margin={{
											top: 5,
											right: 30,
											left: 20,
											bottom: 5
										}}>
										<XAxis dataKey='name' />
										<YAxis />
										<Tooltip
											contentStyle={{ backgroundColor: Color.bordered }}
											itemStyle={{ color: Color.white }}
										/>
										<Legend />
										<Line
											dot={false}
											type='monotone'
											dataKey='readingTimeMin'
											stroke='#8884d8'
										/>

										<Line
											dot={false}
											type='monotone'
											dataKey='progressDelta'
											stroke='#82ca9d'
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						) : (
							<div className='mx-auto mb-8 mt-4'>
								<NothingFound
									className='mx-auto mb-2'
									width={200}
									height={180}
								/>
								<h1 color={Color.gray}>
									Nothing found, try looking for something else
								</h1>
							</div>
						)}
					</DrawerContent>
				</Drawer>
			</div>
		)
	},

	{
		id: 'Library',
		enableHiding: false,
		header: () => <p className='text-center text-lg'>Library</p>,
		cell: ({ row }) => (
			<div className=' max-w-[80px] items-center justify-center  gap-2'>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.savedBooks} Saved`}
				</Button>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.readingBooks} Read`}
				</Button>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.finishedBooks} Finish`}
				</Button>
			</div>
		)
	},
	{
		id: 'genres',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => (
			<div className=' max-w-[110px] items-center justify-center gap-1'>
				{row.original.selectedGenres.map(genre => (
					<GenreElement title={genre.name} svgUri={genre.icon} />
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
						className='bg-muted border-bordered rounded border-[1px] p-2'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						onClick={() =>
							acceptToast('Are you sure you want to delete this book?', {
								action: {
									label: 'Delete',
									onClick: () => {
										if (removeLoading) return infoToast('Please wait')
										remove(row.original.id)
									}
								}
							})
						}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
