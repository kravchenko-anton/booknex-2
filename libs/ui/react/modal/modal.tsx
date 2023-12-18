import type { FC, PropsWithChildren } from 'react'
import { useAction } from '../../../../../apps/web/hooks/useAction'
import { useClickAway } from '../../../../../apps/web/hooks/useOutsideClick'
import { useTypedSelector } from '../../../../../apps/web/hooks/useTypedSelector'
import { Close } from '../../../../global/icons/react'

const Modal: FC<PropsWithChildren> = () => {
	const { popup } = useTypedSelector(state => state.popup)
	const { closePopup } = useAction()
	const reference = useClickAway(() => closePopup())
	return (
		<div
			className={`bg-shade fixed left-0  top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-90 ${
				popup ? 'block' : 'hidden'
			}`}
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
