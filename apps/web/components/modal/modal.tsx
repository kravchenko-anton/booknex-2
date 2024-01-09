import { Close } from '@/global/icons/react'
import { useClickAway } from '@/hooks/useOutsideClick'
import type { FC } from 'react'

const Modal: FC<{
	closePopup: () => void
	popup: JSX.Element | null
}> = ({ closePopup, popup }) => {
	const reference = useClickAway(() => closePopup())
	return (
		<div
			style={{
				display: popup ? 'flex' : 'none'
			}}
			className='bg-shade fixed left-0  top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-90'
		>
			<div ref={reference} className='bg-foreground relative m-4 rounded-xl'>
				<Close
					onClick={() => closePopup()}
					className='absolute right-5 top-[-30px] z-50 cursor-pointer'
					width={20}
					height={20}
				/>
				{popup}
			</div>
		</div>
	)
}

export default Modal
