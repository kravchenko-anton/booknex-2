import type { TitleSizeType } from '@/ui/title/types';
import type { ButtonProperties } from './types';
export declare const settings: {
    colors: Record<Required<ButtonProperties>['variant'], string>;
    titleSize: Record<ButtonProperties['size'], TitleSizeType>;
    padding: Record<ButtonProperties['size'], string>;
    iconSize: Record<ButtonProperties['size'], number>;
};
