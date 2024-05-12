/// <reference types="react" />
import type { BaseFieldProperties } from 'global/types';
import { type FieldValues } from 'react-hook-form';
interface TagsSelectProperties<T extends FieldValues> extends BaseFieldProperties<T> {
    currentRating: number;
}
export declare const mappedTags: (tags: {
    id: number;
    name: string;
}[], selectedTags: string[], setSelectedTags: (tags: string[]) => void) => import("react").JSX.Element[];
export declare const TagsSelect: <T extends Record<string, any>>({ control, name, currentRating }: TagsSelectProperties<T>) => import("react").JSX.Element;
export {};
