import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface State {
  value: number;
  isShowDialog: boolean;
}

// Define the initial state using that type
const initialState: State = {
  value: 0,
  isShowDialog: false,
};

export const DialogSlice = createSlice({
  name: 'dialog',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showDialog: state => {
      state.isShowDialog = true;
    },
    hideDialog: state => {
      state.isShowDialog = false;
    },
  },
});

export const {showDialog, hideDialog} = DialogSlice.actions;
export default DialogSlice.reducer;
