import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SideBarState {
    isShow: boolean;
}

const initialState: SideBarState = {
    isShow: true,
};

const sideBarSlide = createSlice({
    name: 'actionShow',
    initialState,
    reducers: {
        setIsShow: (state, action: PayloadAction<boolean>) => {
            state.isShow = action.payload;
        }
    },
})
export const { setIsShow } = sideBarSlide.actions;
export default sideBarSlide.reducer;
