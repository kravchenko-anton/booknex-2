import { useState } from 'react';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
export const useReaderLoading = () => {
    const [readerLoading, setReaderLoading] = useState(true);
    const loaderAnimation = useAnimatedStyle(() => ({
        opacity: withTiming(Boolean(readerLoading) ? 1 : 0, { duration: 200 }),
        transform: [
            {
                scale: withTiming(Boolean(readerLoading) ? 1 : 0, { duration: 200 })
            }
        ]
    }));
    return { loaderAnimation, readerLoading, setReaderLoading };
};
//# sourceMappingURL=useReaderLoading.js.map