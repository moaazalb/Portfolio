import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/** Shape of the UI state. */
interface UiState {
  isMobileMenuOpen: boolean;
  projectFilter: string;
  blogSearch: string;
}

const initialState: UiState = {
  isMobileMenuOpen: false,
  projectFilter: 'all',
  blogSearch: '',
};

/** Holds transient UI state: mobile menu, project filter, blog search. */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    setProjectFilter: (state, action: PayloadAction<string>) => {
      state.projectFilter = action.payload;
    },
    setBlogSearch: (state, action: PayloadAction<string>) => {
      state.blogSearch = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, setProjectFilter, setBlogSearch } =
  uiSlice.actions;
export default uiSlice.reducer;