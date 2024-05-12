/// <reference types="react" />
import type { ButtonProperties } from '@/ui/button/types';
interface GenreElementProperties extends Omit<ButtonProperties, 'isLoading'> {
    svgUri: string;
    title: string;
}
export declare const GenreElement: ({ svgUri, title, size, variant, ...rest }: GenreElementProperties) => import("react").JSX.Element;
export {};
