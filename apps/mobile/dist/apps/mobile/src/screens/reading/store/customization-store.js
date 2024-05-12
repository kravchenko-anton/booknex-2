import { themePack } from '@/screens/reading/utils/theme-pack';
import { zustandStorage } from '@/utils/mmkv-wrapper';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
export const fontSizeSettings = {
    min: 18,
    max: 26
};
export const ReaderFont = [
    {
        title: 'Fira Sans',
        fontFamily: 'FiraSans'
    },
    {
        title: 'Open Sans',
        fontFamily: 'OpenSans'
    },
    {
        title: 'Poppins',
        fontFamily: 'Poppins'
    },
    {
        title: 'PT Serif',
        fontFamily: 'PTSerif'
    },
    {
        title: 'Roboto',
        fontFamily: 'Roboto'
    }
];
export const initialState = {
    colorScheme: themePack[0],
    font: {
        title: ReaderFont[0]?.title,
        fontFamily: ReaderFont[0]?.fontFamily
    },
    fontSize: fontSizeSettings.min,
    lineHeight: 1.3,
    padding: 14
};
export const useCustomizationStore = create()(persist(set => ({
    ...initialState,
    changeTheme: (payload) => set(state => ({
        ...state,
        colorScheme: themePack.find(theme => theme.slug === payload)
    })),
    changeLineHeight: (payload) => set(state => ({ ...state, lineHeight: payload })),
    changePadding: (payload) => set(state => ({ ...state, padding: payload })),
    changeFontFamily: (payload) => set(state => ({ ...state, font: payload })),
    changeFontSize: (payload) => set(state => {
        if (payload < fontSizeSettings.min || payload > fontSizeSettings.max)
            return state;
        return { ...state, fontSize: payload };
    })
}), {
    name: 'customization-store',
    storage: createJSONStorage(() => zustandStorage)
}));
//# sourceMappingURL=customization-store.js.map