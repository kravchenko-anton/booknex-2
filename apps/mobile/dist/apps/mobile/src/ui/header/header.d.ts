import type { PressableDefaultProperties, TextDefaultProperties, ViewDefaultProperties } from '@/types/component-types';
import type { ButtonProperties } from '@/ui/button/types';
import type { IconProperties } from '@/ui/icon/types';
import type { FC, PropsWithChildren } from 'react';
export declare const Head: FC<PropsWithChildren<ViewDefaultProperties>>;
export declare const BackButton: FC<PressableDefaultProperties>;
export declare const BackWithTitle: FC<{
    title: string;
}>;
export declare const Logo: FC<Omit<TextDefaultProperties, 'onPress'>>;
export declare const Button: FC<Pick<ButtonProperties, 'variant' | 'children' | 'onPress'>>;
export declare const Icon: FC<Omit<IconProperties, 'variant' | 'noPadding' | 'size'>>;
declare const _default: {
    Head: FC<PropsWithChildren<ViewDefaultProperties>>;
    Logo: FC<Omit<TextDefaultProperties, "onPress">>;
    BackWithTitle: FC<{
        title: string;
    }>;
    Icon: FC<Omit<IconProperties, "size" | "variant" | "noPadding">>;
};
export default _default;
