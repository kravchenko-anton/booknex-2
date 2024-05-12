import type { MenuItemType, TypeNavigate } from '@/navigation/bottom-menu/menu.list';
import type { FC } from 'react';
interface IMenuItemProperties {
    currentRoute?: string;
    item: MenuItemType;
    nav: TypeNavigate;
}
declare const MenuItem: FC<IMenuItemProperties>;
export default MenuItem;
