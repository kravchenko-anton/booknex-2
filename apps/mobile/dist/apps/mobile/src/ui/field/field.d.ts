/// <reference types="react" />
import type { FieldProperties } from './types';
declare const Field: <T extends Record<string, any>>({ variant, icon: Icon, className, style, isArea, ...properties }: FieldProperties<T>) => JSX.Element | null;
export default Field;
