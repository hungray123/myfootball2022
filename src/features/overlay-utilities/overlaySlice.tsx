import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OverlayState {
  utilitySelected: string;
}

// Define the initial state using that type
const initialState: OverlayState = {
  utilitySelected: '',
};

const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    setUtilitySelected: (state, action: PayloadAction<string>) => {
      state.utilitySelected = action.payload;
    },
    clearDataOverlay: state => {
      state.utilitySelected = initialState.utilitySelected;
    },
  },
  extraReducers: () => {},
});

export const { setUtilitySelected, clearDataOverlay } = overlaySlice.actions;
export default overlaySlice.reducer;
