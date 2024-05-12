import { ScrollView as DefaultScrollView } from 'react-native';
const ScrollView = ({ ...properties }) => (<DefaultScrollView renderToHardwareTextureAndroid automaticallyAdjustContentInsets={false} overScrollMode='never' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} alwaysBounceHorizontal={false} alwaysBounceVertical={false} bounces={false} bouncesZoom={false} decelerationRate='normal' {...properties}>
		{properties.children}
	</DefaultScrollView>);
export default ScrollView;
//# sourceMappingURL=scroll-view.js.map