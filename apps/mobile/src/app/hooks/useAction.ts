import { rootAction } from '@/redux/root-action'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

export const useAction = () => {
	const dispatch = useDispatch()
	return bindActionCreators(rootAction, dispatch)
}
