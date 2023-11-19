import type { TypeRootStackParameterList } from '@/navigation/navigation-types'
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'

export const useTypedRoute = <N extends keyof TypeRootStackParameterList>() =>
	useRoute<RouteProp<TypeRootStackParameterList, N>>()
