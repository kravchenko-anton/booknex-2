/// <reference types="react" />
import type { PressableDefaultProperties } from '@/types/component-types';
export interface ListItemType extends Omit<PressableDefaultProperties, 'pointerEvents' | 'style'> {
    title: string;
    description?: string;
    bordered?: boolean;
}
export declare const Item: ({ title, description, className, onPress, bordered, ...properties }: ListItemType) => import("react").JSX.Element;
