import { Color } from 'global/colors';
import { Text } from 'react-native';
import { fontSettings, fontSizes } from './settings';
const Title = ({ children, numberOfLines = 1, weight = 'light', size = 'md', center = false, style, ...properties }) => {
    if (!children)
        return null;
    return (<Text numberOfLines={numberOfLines} style={[
            {
                fontFamily: fontSettings[weight],
                fontSize: fontSizes[size],
                textAlign: center ? 'center' : 'left',
                color: properties.color ?? Color.white
            },
            style
        ]} {...properties}>
			{children}
		</Text>);
};
export default Title;
//# sourceMappingURL=title.js.map