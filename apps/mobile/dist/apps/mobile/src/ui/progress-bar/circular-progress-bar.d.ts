import type { FC } from 'react';
import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CircularProgressProperties {
    style?: StyleProp<ViewStyle>;
    size: number;
    width: number;
    fill: number;
    backgroundWidth?: number;
    tintColor?: string;
    tintTransparency?: boolean;
    backgroundColor?: string;
    rotation?: number;
    lineCap?: 'butt' | 'round' | 'square';
    fillLineCap?: 'butt' | 'round' | 'square';
    arcSweepAngle?: number;
    children?: ((fill: number) => JSX.Element) | React.ReactChild;
    childrenContainerStyle?: StyleProp<ViewStyle> | ViewStyle;
    padding?: number;
    renderCap?: (payload: {
        center: {
            x: number;
            y: number;
        };
    }) => React.ReactNode;
    dashedTint?: {
        width: number;
        gap: number;
    };
    dashedBackground?: {
        width: number;
        gap: number;
    };
}
export declare const polarToCartesian: (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    x: number;
    y: number;
};
export declare const circlePathFunction: (x: number, y: number, radius: number, startAngle: number, endAngle: number) => string;
export declare const clampFill: (fill: number) => number;
export declare const CircularProgressBar: FC<CircularProgressProperties>;
