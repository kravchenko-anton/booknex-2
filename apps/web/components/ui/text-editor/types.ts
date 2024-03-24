import type { ClampPaletteType } from 'global/colors';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import type { DefaultTextAreaProperties } from '../base-components-types';

export interface FormTextEditorProperties<T extends FieldValues> extends TextAreaProperties {
  control: Control<T>;
  name: FieldPath<T>;
}

export interface TextAreaProperties extends DefaultTextAreaProperties {
  variant?: ClampPaletteType;
}
