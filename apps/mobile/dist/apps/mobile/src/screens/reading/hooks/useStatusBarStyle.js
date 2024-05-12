import { useTypedNavigation } from '@/hooks';
import { useEffect } from 'react';
export const useStatusBarStyle = ({ colorScheme, readerUiVisible }) => {
    const { setOptions } = useTypedNavigation();
    useEffect(() => {
        setOptions({
            statusBarStyle: colorScheme.statusBar,
            navigationBarColor: colorScheme.colorPalette.background.darker,
            navigationBarHidden: true,
            statusBarTranslucent: true,
            statusBarHidden: !readerUiVisible,
            statusBarColor: colorScheme.colorPalette.background.darker
        });
    }, [colorScheme, setOptions, readerUiVisible]);
};
//# sourceMappingURL=useStatusBarStyle.js.map