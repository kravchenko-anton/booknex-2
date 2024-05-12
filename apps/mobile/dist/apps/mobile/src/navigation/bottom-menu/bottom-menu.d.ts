import type { FC } from 'react';
import type { TypeNavigate } from './menu.list';
interface IBottomMenuProperties {
    currentRoute?: string;
    nav: TypeNavigate;
}
declare const BottomMenu: FC<IBottomMenuProperties>;
export default BottomMenu;
