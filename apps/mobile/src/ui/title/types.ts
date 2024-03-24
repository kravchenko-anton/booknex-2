import type { TextDefaultProperties } from '@/types/component-types';
import type { ColorProperties } from 'global/colors';
import type { ReactNode } from 'react';
import type { fontSettings } from './settings';

export type TitleSizeType = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type TitleProperties = TextDefaultProperties &
  ColorProperties & {
    center?: boolean;
    children: ReactNode;
    size?: TitleSizeType;
    weight?: keyof typeof fontSettings;
  };
