import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    alert: null
};
const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, { payload }) => {
            state.alert = payload;
        },
        closeAlert: state => {
            state.alert = null;
        }
    }
});
export const { reducer: alertReducer, actions: alertAction } = alertSlice;
//# sourceMappingURL=alert-slice.js.map