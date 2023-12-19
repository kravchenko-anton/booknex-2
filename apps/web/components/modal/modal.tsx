import { useAction } from '@/hooks/useAction'
import { useClickAway } from '@/hooks/useOutsideClick'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import type { FC, PropsWithChildren } from 'react'
import { Close } from '../../../../libs/global/icons/react'

const Modal: FC<PropsWithChildren> = () => {
	const { popup } = useTypedSelector(state => state.popup)
	const { closePopup } = useAction()
	const reference = useClickAway(() => closePopup())
	console.log(popup)
	return (
		<div
			style={{
				display: popup ? 'flex' : 'none'
			}}
			className="bg-shade fixed left-0  top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-90"
		>
			<div ref={reference} className="bg-foreground relative m-4 rounded-xl">
				<Close
					onClick={() => closePopup()}
					className="absolute right-5 top-[-30px] z-50 cursor-pointer"
					width={20}
					height={20}
				/>
				{popup}
			</div>
		</div>
	)
}

export default Modal
