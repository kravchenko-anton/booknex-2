import { useClickAway } from '@/hooks/useOutsideClick'
import { Close } from 'global/icons/react'
import type { FC } from 'react'

const Modal: FC<{
	closePopup: () => void
	popup: JSX.Element | null
}> = ({ closePopup, popup }) => {
	const reference = useClickAway(() => closePopup())
	return (
		<div
			className='bg-shade fixed left-0  top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-90'
			style={{
				display: popup ? 'flex' : 'none'
			}}
		>
			<div className='bg-foreground relative m-4 rounded-xl' ref={reference}>
				<Close
					className='absolute right-5 top-[-30px] z-50 cursor-pointer'
					height={20}
					onClick={() => closePopup()}
					width={20}
				/>
				{popup}
			</div>
		</div>
	)
}

export default Modal
