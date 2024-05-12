import api from '@/api';
import { useReadingProgressStore } from '@/screens/reading/store/progress-store';
import { errorToast } from '@/utils/toast';
import { useIsFocused } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'global/utils/query-keys';
import { useShallow } from 'zustand/react/shallow';
export const useLibraryWithSync = () => {
    const isFocus = useIsFocused();
    const { history, clearHistory } = useReadingProgressStore(useShallow(state => ({
        history: state.history,
        clearHistory: state.clearHistory
    })));
    console.log('actual history in library', history);
    const { data: library, isLoading } = useQuery({
        queryKey: QueryKeys.library,
        queryFn: () => api.user.library(history.map(b => ({
            ...b,
            startDate: b.startDate,
            endDate: b.endDate
        }))),
        select: data => data.data,
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        onError: () => isFocus && errorToast('Failed to sync library'),
        onSuccess: () => {
            console.log('sync profile success, clear history', history);
            clearHistory();
        }
    });
    return { library, isLoading, history };
};
//# sourceMappingURL=useLibraryWithSync.js.map