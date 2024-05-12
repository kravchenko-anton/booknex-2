import type { TextDefaultProperties } from '@/types/component-types';
import type { ColorProperties } from 'global/colors';
import type { SizeType } from 'global/types';
import type { ReactNode } from 'react';
import type { fontSettings } from './settings';
export type TitleSizeType = SizeType | ('xl' | 'xxl');
export type TitleProperties = TextDefaultProperties & ColorProperties & {
    center?: boolean;
    children: ReactNode;
    size?: TitleSizeType;
    weight?: keyof typeof fontSettings;
};
