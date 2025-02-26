import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

interface LayoutState {
  isSidebarOpen: boolean;
}

const initialState: LayoutState = {
  isSidebarOpen: true,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = layoutSlice.actions;
export const selectIsSidebarOpen = (state: RootState) => state.layout.isSidebarOpen;
export default layoutSlice.reducer;