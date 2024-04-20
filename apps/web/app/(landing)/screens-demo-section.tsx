import { appName } from 'global/utils'
import Image from 'next/image'
import CatalogScreen from '../../public/screens/catalog-page.jpg'
import ReadingScreen from '../../public/screens/reading-page.jpg'

export const ScreensDemoSection = () => (
	<div>
		<div className='py-16'>
			<div
				id='subscription'
				className='mx-auto flex w-2/3 items-center justify-between'>
				<div className='w-1/2 py-16'>
					<h1 className='text-3xl'>Hundreds of books by subscription</h1>
					<p className='mt-4 text-xl'>
						Subscription A subscription to {appName} gives you access to
						hundreds of books from all genres. You can read as many books as you
						want for a single monthly fee.
					</p>
				</div>
				<div className='w-1/2  py-16'>
					<Image
						src={CatalogScreen}
						alt={'book'}
						width={270}
						height={250}
						className={
							'bg-foreground border-bordered ml-auto rounded-md border-2'
						}
					/>
				</div>
			</div>
		</div>

		<div className='py-16'>
			<div
				id='subscription'
				className='mx-auto flex w-2/3 items-center justify-between'>
				<div className='w-1/2  py-16'>
					<Image
						src={ReadingScreen}
						alt={'book'}
						width={270}
						height={250}
						className={
							'bg-foreground border-bordered mr-auto rounded-md border-2'
						}
					/>
				</div>
				<div className='w-1/2 py-16'>
					<h1 className='text-3xl'>More than 20 themes, fonts and colors</h1>
					<p className='mt-4 text-xl'>
						You can customize the reading interface to your liking. Choose from
						over 20 themes, fonts, and colors to make your reading experience
						more enjoyable.
					</p>
				</div>
			</div>
		</div>
	</div>
)
