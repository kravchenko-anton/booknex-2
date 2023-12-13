import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header, Image, Title } from '@/components';
import LargeHeaderScrollLayout from '@/components/layout/header-scroll-layout/large-header-scroll-layout';
import { View } from 'react-native';
import { Color } from '../../../../../../libs/ui/colors';
const AuthorLayout = ({ children, ...properties }) => (_jsx(LargeHeaderScrollLayout, { animatedHeader: {
        title: properties.name,
        transientValue: 90,
        right: {
            sharing: `${properties.name} is a great author! Check him on Booknex!`
        }
    }, headerChildren: _jsx(View, { style: {
            backgroundColor: properties.backgroundColor
        }, className: 'h-[250px]', children: _jsxs(View, { className: 'flex-1 bg-[#0000009a]  p-4 pt-0', children: [_jsx(Header, { color: Color.white, right: {
                        sharing: `${properties.name} is a great author! Check him on Booknex!`
                    } }), _jsx(Image, { url: properties.picture, className: 'mb-4 mt-2 self-center', height: 100, width: 100 }), _jsx(Title, { size: 26, color: Color.white, center: true, weight: 'bold', numberOfLines: 2, children: properties.name })] }) }), children: children }));
export default AuthorLayout;
//# sourceMappingURL=author-layout.js.map