import { Button } from '@/components/ui'
import { appName, mailLink, socialLinks } from 'global/utils'
import Image from 'next/image'
import Link from 'next/link'
import DeveloperLogo from '../../public/dev-logo.png'
import { Header } from '@/app/(landing)/header'

const Page = () => (
	<div>
		<Header/>
		<div className='px-2 pt-8 md:mx-auto md:w-[40%] md:px-0'>
			<h1 className='text-2xl font-light md:text-3xl'>About {appName}</h1>

			<h3 className='mb-2 mt-4 text-lg font-bold md:text-xl'>Our mission</h3>

			<p className=' text-md font-light md:text-lg'>
				Our mission is to provide a platform where readers can access a wide
				range of books from all genres. We want to make reading more accessible
				and enjoyable for everyone.
			</p>

			<h3 className='md:text- mt-4 text-lg font-bold'>Our Author</h3>
			<div className='gap-5 py-4 md:flex md:items-center md:justify-between'>
				<div className='w-full'>
					<Image
						src={DeveloperLogo}
						alt={'Anton Kravchenko'}
						width={250}
						height={250}
						objectFit='cover'
						className={'object-cover'}
					/>
				</div>
				<div>
					<h1 className='mb-2 mt-2 text-2xl'>Anton Kravchenko</h1>
					<p className='text-md font-light'>
						Lead developer at {appName}. Anton is a software engineer with a
						passion for creating innovative solutions. He is dedicated to
						providing the best possible experience for our users.
					</p>
					<div className='mt-4 flex gap-2'>
						<Link href={mailLink}>
							<Button variant='danger' size='sm'>
								Mail
							</Button>
						</Link>
						<Link href={socialLinks.telegram}>
							<Button variant='primary' size='sm'>
								Telegram
							</Button>
						</Link>
						<Link href={socialLinks.github}>
							<Button variant='foreground' size='sm'>
								Github
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default Page
