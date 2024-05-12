import type { PressableDefaultProperties } from '@/types/component-types';
import type { FC } from 'react';
interface LineHeightIconProperties extends PressableDefaultProperties {
    backgroundColor: string;
    lineCount: number;
}
declare const LineHeightIcon: FC<LineHeightIconProperties>;
export default LineHeightIcon;
