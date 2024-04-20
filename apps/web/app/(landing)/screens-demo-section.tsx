import { appName } from 'global/utils'
import Image from 'next/image'
import CatalogScreen from '../../public/screens/catalog-page.jpg'
import ReadingScreen from '../../public/screens/reading-page.jpg'

export const ScreensDemoSection = () => (
	<div>
		<div className='py-16'>
			<div
				id='subscription'
				className='items-center justify-between px-2 py-6 md:mx-auto md:flex md:w-2/3 md:px-0 md:py-16'>
				<div className='md:w-1/2'>
					<h1 className='text-xl md:text-3xl'>
						Hundreds of books by subscription
					</h1>
					<p className='text-md mt-4 md:text-xl'>
						Subscription A subscription to {appName} gives you access to
						hundreds of books from all genres. You can read as many books as you
						want for a single monthly fee.
					</p>
				</div>
				<div className='mt-4 md:mt-0 md:w-1/2'>
					<Image
						src={CatalogScreen}
						alt={'book'}
						width={270}
						height={250}
						className={
							'bg-foreground border-bordered  rounded-md border-2 md:ml-auto'
						}
					/>
				</div>
			</div>
		</div>
		<div className='py-16'>
			<div
				id='subscription'
				className='items-center justify-between px-2 py-6 md:mx-auto md:flex md:w-2/3 md:px-0 md:py-16'>
				<div className='mt-4 md:mt-0 md:w-1/2'>
					<Image
						src={ReadingScreen}
						alt={'book'}
						width={270}
						height={250}
						className={
							'bg-foreground border-bordered mb-4 rounded-md border-2 md:mb-0 md:mr-auto'
						}
					/>
				</div>
				<div className='md:w-1/2'>
					<h1 className='text-xl md:text-3xl'>
						More than 20 themes, fonts and colors
					</h1>
					<p className='text-md mt-4 md:text-xl'>
						You can customize the reading interface to your liking. Choose from
						over 20 themes, fonts, and colors to make your reading experience
						more enjoyable.
					</p>
				</div>
			</div>
		</div>
	</div>
)
