import type { ClampPaletteType } from 'global/colors';
import { BaseFieldProperties } from 'global/types';
import type { FC } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { KeyboardTypeOptions, TextInputProps } from 'react-native';
import type { SvgProps } from 'react-native-svg';
export interface FieldProperties<T extends FieldValues> extends Omit<TextInputProps, 'onChange' | 'onChangeText' | 'value' | 'testID'>, BaseFieldProperties<T> {
    isArea?: boolean;
    icon?: FC<SvgProps>;
    keyboardType?: KeyboardTypeOptions;
    variant?: ClampPaletteType;
}
