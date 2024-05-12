import type { TypeRootStackParameterListType } from '@/navigation/navigation-types';
import type { RouteProp } from '@react-navigation/native';
export declare const useTypedRoute: <T extends keyof TypeRootStackParameterListType>() => RouteProp<TypeRootStackParameterListType, T>;
