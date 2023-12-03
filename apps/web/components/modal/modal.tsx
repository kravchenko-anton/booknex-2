import type { FC, PropsWithChildren } from 'react'

interface ModalProperties {
	isOpen: boolean
}
const Modal: FC<PropsWithChildren<ModalProperties>> = ({
	isOpen,
	children
}) => {
	return (
		<div
			className={`bg-shade fixed left-0 top-0 z-50 h-full w-full bg-opacity-50 ${
				isOpen ? 'block' : 'hidden'
			}`}>
			<div className='mx-auto my-20 h-[500px] w-[500px] rounded-xl bg-white'>
				{children}
			</div>
		</div>
	)
}

export default Modal
