import { zustandStorage } from '@/utils/mmkv-wrapper';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
const initialState = {
    history: []
};
export const useReadingProgressStore = create()(persist(set => ({
    ...initialState,
    // addNewProgress if history with this id exists, update info
    newProgress: newHistory => {
        set(state => {
            if (state.history.some(h => h.id === newHistory.id)) {
                // update info in old history
                console.log('update info in old history', newHistory.id, newHistory.endProgress);
                return {
                    ...state,
                    history: state.history.map(history => history.id === newHistory.id ? newHistory : history)
                };
            }
            console.log('add new history', newHistory.id, newHistory.endProgress);
            return { ...state, history: [...state.history, newHistory] };
        });
    },
    clearHistory: () => set(({ history, ...state }) => ({ ...state, history: [] })),
    updateStartFromReadingScreen: (data) => set(state => ({
        ...state,
        history: state.history.map(({ ...h }) => h.id === data.id
            ? { ...h, startFromReadingScreen: data.startFromReadingScreen }
            : h)
    }))
}), {
    name: 'progress-store',
    storage: createJSONStorage(() => zustandStorage)
}));
//# sourceMappingURL=progress-store.js.map