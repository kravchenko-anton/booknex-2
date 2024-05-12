import { useTypedNavigation } from '@/hooks';
import { useReadingProgressStore } from '@/screens/reading/store/progress-store';
import { getTimeDate } from 'global/utils';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
export const useReadingProgress = ({ readerLoading, slug, initialScrollPosition }) => {
    const [readingSessionKey, setReadingSessionKey] = useState(slug + Math.random() * 1000);
    const [startReadingDate, setStartReadingDate] = useState(getTimeDate()); // eslint-disable-line
    const [startReadingProgress, setStartReadingProgress] = useState(0);
    console.log('startReadingDate', startReadingDate);
    const { addListener } = useTypedNavigation();
    const updateStartFromReadingScreen = useReadingProgressStore(state => state.updateStartFromReadingScreen);
    const newProgress = useReadingProgressStore(state => state.newProgress);
    const [scrollPosition, setScrollPosition] = useState(initialScrollPosition || 0);
    const [readingProgress, setReadingProgress] = useState({
        progress: 0,
        chapter: {
            link: '',
            progress: 0
        }
    });
    useEffect(() => {
        if (readerLoading)
            return;
        const listener = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                setStartReadingDate(getTimeDate());
                setReadingSessionKey(slug + Math.random() * 1000);
            }
        });
        const beforeLeave = addListener('beforeRemove', () => {
            console.log('beforeRemove');
            updateStartFromReadingScreen({
                id: readingSessionKey,
                startFromReadingScreen: false
            });
        });
        return () => {
            beforeLeave();
            listener.remove();
        };
    }, [
        addListener,
        readerLoading,
        readingSessionKey,
        updateStartFromReadingScreen
    ]);
    const clearProgress = () => {
        setScrollPosition(0);
        setReadingProgress({
            progress: 0,
            chapter: {
                link: '',
                progress: 0
            }
        });
    };
    const updateReadingProgress = (payload) => {
        if (!startReadingProgress) {
            setStartReadingProgress(payload.progress);
        }
        setReadingProgress({
            progress: payload.progress,
            chapter: {
                link: payload.chapter.chapterLink,
                progress: payload.chapter.chapterProgress
            }
        });
        setScrollPosition(payload.scrollTop);
        console.log((getTimeDate().getTime() - startReadingDate.getTime()) / 1000);
        newProgress({
            startFromReadingScreen: true,
            id: readingSessionKey,
            bookSlug: slug,
            startProgress: startReadingProgress,
            endProgress: payload.progress,
            progressDelta: payload.progress - startReadingProgress,
            scrollPosition: scrollPosition,
            endDate: getTimeDate(),
            startDate: startReadingDate,
            readingTimeMs: getTimeDate().getTime() - startReadingDate.getTime()
        });
    };
    return {
        scrollPosition,
        readingProgress,
        updateReadingProgress,
        clearProgress
    };
};
//# sourceMappingURL=useReadingProgress.js.map