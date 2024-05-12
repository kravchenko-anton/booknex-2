import { AnimatedPressable } from '@/ui/animated-components';
import { usePressAnimation } from '@/ui/animated-press/press-animation';
import { memo } from 'react';
const AnimatedPress = ({ children, style, className = '', ...properties }) => {
    const { pressFunctions, animatedStyle } = usePressAnimation();
    return (<AnimatedPressable {...pressFunctions} className={className} style={[style, animatedStyle]} {...properties}>
			{children}
		</AnimatedPressable>);
};
export default memo(AnimatedPress);
//# sourceMappingURL=animated-press.js.map