import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Color } from '../../../../../../libs/ui/colors';
const BigLoader = ({ backgroundColor = Color.background }) => (_jsx(View, { style: {
        backgroundColor: backgroundColor
    }, className: 'absolute h-full w-full items-center justify-center', children: _jsx(ActivityIndicator, { size: 'large', color: Color.secondary, className: 'h-[200px] w-[200px]' }) }));
export default memo(BigLoader);
//# sourceMappingURL=big-loader.js.map