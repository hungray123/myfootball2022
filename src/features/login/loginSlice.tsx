import {createSlice} from '@reduxjs/toolkit';
import {CacheCommon} from 'app/type';

interface State {
  common: CacheCommon;
}

const initialState: State = {
  common: {},
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder;
  },
});

export default loginSlice.reducer;
