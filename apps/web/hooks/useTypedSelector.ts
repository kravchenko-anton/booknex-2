import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector } from 'react-redux'
import type { TypeRootState } from '../redux/store'

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
