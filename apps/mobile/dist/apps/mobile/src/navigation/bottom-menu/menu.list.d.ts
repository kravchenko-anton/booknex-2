import type { TypeRootStackParameterListType } from '@/navigation/navigation-types';
import type { IconType } from '@/types/global';
export interface MenuItemType {
    icon: IconType;
    path: keyof TypeRootStackParameterListType;
}
export type TypeNavigate = (screenName: keyof TypeRootStackParameterListType) => void;
export declare const menuItems: MenuItemType[];
