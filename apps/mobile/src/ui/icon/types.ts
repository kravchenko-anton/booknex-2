import type { PressableDefaultProperties } from '@/types/component-types';
import type { ClampPaletteType } from 'global/colors';
import type { SizeProperties } from 'global/types';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

export interface IconProperties extends PressableDefaultProperties, SizeProperties {
  icon: FC<SvgProps>;
  fatness?: number;
  fill?: boolean;
  stroke?: string;
  fullRounded?: boolean;
  noPadding?: boolean;
  variant?: ClampPaletteType | 'white-outlined' | 'transparent';
}
