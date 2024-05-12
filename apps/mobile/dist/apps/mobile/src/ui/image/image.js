import { cn } from '@/utils';
import { getFileUrl } from 'global/api-config';
import { Image as DefaultImage } from 'react-native';
const Image = ({ height = 100, width = 100, borderRadius = 12, url = '', className, style, fullSize = false, ...properties }) => (<DefaultImage className={cn('bg-muted', fullSize ? 'h-full' : 'h-auto', className)} source={{
        uri: getFileUrl(url),
        width,
        height
    }} style={[
        {
            width,
            height,
            borderRadius
        },
        style
    ]} {...properties}/>);
export default Image;
//# sourceMappingURL=image.js.map