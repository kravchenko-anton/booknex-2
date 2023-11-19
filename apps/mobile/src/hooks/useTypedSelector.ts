import type { TypeRootState } from '@/redux/store'
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux'

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
