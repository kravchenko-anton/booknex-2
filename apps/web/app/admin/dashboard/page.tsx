'use client'
import { Book, Library, PenNib, User } from 'icons'
import type { FC } from 'react'

const Page: FC = () => {
	console.log(Page)
	return (
		<div className='w-full'>
			<h1 className='text-3xl font-medium'>Dashboard</h1>
			<div className='mt-4 flex items-center justify-between gap-5'>
				<div className='bg-muted  w-full rounded-xl p-4'>
					<div className='flex items-center justify-between'>
						<div className='bg-foreground flex h-[70px] w-[70px] items-center justify-center rounded-xl'>
							<User width={40} height={40} />
						</div>
						<h2 className='bg-foreground rounded-xl p-4 text-lg font-bold'>
							+<b className='text-danger'>10</b> per month
						</h2>
					</div>
					<h1 className='mt-4 text-lg font-light text-white'>Users</h1>
					<h2 className='mt-4 text-4xl font-bold'>4256</h2>
				</div>
				<div className='bg-muted  w-full rounded-xl p-4'>
					<div className='flex items-center justify-between'>
						<div className='bg-foreground flex h-[70px] w-[70px] items-center justify-center rounded-xl'>
							<Book width={40} height={40} />
						</div>
						<h2 className='bg-foreground rounded-xl p-4 text-lg font-bold'>
							+<b className='text-danger'>10</b> per month
						</h2>
					</div>
					<h1 className='mt-4 text-lg font-light text-white'>Books</h1>
					<h2 className='mt-4 text-4xl font-bold'>4256</h2>
				</div>
				<div className='bg-muted  w-full rounded-xl p-4'>
					<div className='flex items-center justify-between'>
						<div className='bg-foreground flex h-[70px] w-[70px] items-center justify-center rounded-xl'>
							<PenNib width={40} height={40} />
						</div>
						<h2 className='bg-foreground rounded-xl p-4 text-lg font-bold'>
							+<b className='text-danger'>10</b> per month
						</h2>
					</div>
					<h1 className='mt-4 text-lg font-light text-white'>Authors</h1>
					<h2 className='mt-4 text-4xl font-bold'>4256</h2>
				</div>
				<div className='bg-muted  w-full rounded-xl p-4'>
					<div className='flex items-center justify-between'>
						<div className='bg-foreground flex h-[70px] w-[70px] items-center justify-center rounded-xl'>
							<Library width={40} height={40} />
						</div>
						<h2 className='bg-foreground rounded-xl p-4 text-lg font-bold'>
							+<b className='text-danger'>10</b> per month
						</h2>
					</div>
					<h1 className='mt-4 text-lg font-light text-white'>Collections</h1>
					<h2 className='mt-4 text-4xl font-bold'>4256</h2>
				</div>
			</div>
		</div>
	)
}

export default Page
