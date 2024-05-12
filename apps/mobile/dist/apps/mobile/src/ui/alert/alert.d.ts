import type { IconType } from '@/types/global';
import type { VividPaletteType } from 'global/colors';
import type { FunctionType } from 'global/types';
import type { FC } from 'react';
interface AlertProperties {
    icon: IconType;
    description: string;
    acceptText: string;
    type: VividPaletteType;
    onAccept: FunctionType;
    onClose: FunctionType;
}
declare const Alert: FC<AlertProperties>;
export default Alert;
