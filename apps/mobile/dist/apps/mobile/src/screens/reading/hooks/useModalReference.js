import { useTypedNavigation } from '@/hooks';
import { useRef } from 'react';
export const useModalReference = (setReaderUiVisible) => {
    const { addListener } = useTypedNavigation();
    const chaptersListModalReference = useRef(null);
    const readingSettingsModalReference = useRef(null);
    // closing all modals when leaving the screen
    const unsubscribe = addListener('beforeRemove', () => {
        setReaderUiVisible(false);
        readingSettingsModalReference.current?.close();
        chaptersListModalReference.current?.close();
        return () => unsubscribe();
    });
    return {
        chaptersListModalReference,
        readingSettingsModalReference
    };
};
//# sourceMappingURL=useModalReference.js.map