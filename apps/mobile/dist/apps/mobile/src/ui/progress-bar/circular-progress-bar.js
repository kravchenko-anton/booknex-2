import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
};
export const circlePathFunction = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle * 0.9999999);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ];
    return d.join(' ');
};
export const clampFill = (fill) => Math.min(100, Math.max(0, fill));
export const CircularProgressBar = ({ backgroundColor, backgroundWidth, children = () => null, tintColor, arcSweepAngle = 360, childrenContainerStyle = {}, renderCap, dashedBackground = { width: 0, gap: 0 }, dashedTint = { width: 0, gap: 0 }, fillLineCap, lineCap, rotation, style, tintTransparency, width, fill, padding = 0, size }) => {
    const maxWidthCircle = backgroundWidth
        ? Math.max(width, backgroundWidth)
        : width;
    const sizeWithPadding = size / 2 + padding / 2;
    const radius = size / 2 - maxWidthCircle / 2 - padding / 2;
    const currentFillAngle = (arcSweepAngle * clampFill(fill)) / 100;
    const circlePath = circlePathFunction(sizeWithPadding, sizeWithPadding, radius, 0, currentFillAngle);
    const backgroundPath = circlePathFunction(sizeWithPadding, sizeWithPadding, radius, tintTransparency ? 0 : currentFillAngle, arcSweepAngle);
    const coordinate = polarToCartesian(sizeWithPadding, sizeWithPadding, radius, currentFillAngle);
    const cap = renderCap ? renderCap({ center: coordinate }) : null;
    const offset = size - maxWidthCircle * 2;
    const localChildrenContainerStyle = {
        position: 'absolute',
        left: maxWidthCircle + padding / 2,
        top: maxWidthCircle + padding / 2,
        width: offset,
        height: offset,
        borderRadius: offset / 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...childrenContainerStyle
    };
    const strokeDasharrayTint = dashedTint.gap > 0
        ? Object.values(dashedTint).map(value => Number.parseInt(String(value)))
        : undefined;
    const strokeDasharrayBackground = dashedBackground.gap > 0
        ? Object.values(dashedBackground).map(value => Number.parseInt(String(value)))
        : null;
    return (<View style={style}>
			<Svg width={size + padding} height={size + padding}>
				<G rotation={rotation} originX={(size + padding) / 2} originY={(size + padding) / 2}>
					{backgroundColor ? (<Path d={backgroundPath} stroke={backgroundColor} strokeWidth={backgroundWidth || width} strokeLinecap={lineCap} strokeDasharray={strokeDasharrayBackground || undefined} fill='transparent'/>) : null}
					{fill > 0 && (<Path d={circlePath} stroke={tintColor} strokeWidth={width} strokeLinecap={fillLineCap} strokeDasharray={strokeDasharrayTint} fill='transparent'/>)}
					{cap}
				</G>
			</Svg>
			{children ? (<View style={localChildrenContainerStyle}>
					{
            // @ts-ignore
            children(fill)}
				</View>) : null}
		</View>);
};
//# sourceMappingURL=circular-progress-bar.js.map