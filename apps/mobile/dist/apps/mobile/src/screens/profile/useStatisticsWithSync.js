import api from '@/api';
import { useReadingProgressStore } from '@/screens/reading/store/progress-store';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'global/utils/query-keys';
import { useShallow } from 'zustand/react/shallow';
export const useStatisticsWithSync = () => {
    const { history = [], clearHistory } = useReadingProgressStore(useShallow(state => ({
        history: state.history,
        clearHistory: state.clearHistory
    })));
    const { data: statistics, isLoading } = useQuery({
        queryKey: QueryKeys.userStatistics,
        queryFn: () => api.user.statistics(history.map(b => ({
            ...b,
            startDate: b.startDate,
            endDate: b.endDate
        }))),
        select: data => data.data,
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
        onSuccess: () => {
            console.log('sync success, clear history', history);
            clearHistory();
        },
        onError: () => console.log('Failed to sync statistics')
    });
    return { isLoading, statistics };
};
//# sourceMappingURL=useStatisticsWithSync.js.map