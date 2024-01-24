import { useAction } from '@/shared/hooks'
import Modal from '@/shared/ui/modal/modal'
import { Logout } from 'icons'

const LogoutModal = () => {
	const { logout } = useAction()
	return (
		<Modal
			icon={Logout}
			description='Are you sure you want to logout?'
			acceptText='Logout'
			type='danger'
			onAccept={logout}
		/>
	)
}

export default LogoutModal
