import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarItem } from 'app/type';
import { appConstants } from 'constants/const';
import moment from 'moment';

// Define the initial state using that type
const initialState: CalendarItem = {
  description: '',
  end: moment().toJSON(),
  id: '',
  level: appConstants.PRIORITY.HIGH,
  location: '',
  name: '',
  start: moment().toJSON(),
  status: '',
  type: '',
  updatedDate: '',
};

export const createCalendarSlice = createSlice({
  name: 'createCalendar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setStart: (state, action: PayloadAction<string>) => {
      state.start = action.payload;
    },
    setEnd: (state, action: PayloadAction<string>) => {
      state.end = action.payload;
    },
    setLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    clearData: state => {
      state.description = '';
      state.end = moment().toJSON();
      state.id = '';
      state.level = appConstants.PRIORITY.HIGH;
      state.location = '';
      state.name = '';
      state.start = moment().toJSON();
      state.status = '';
    },
    setData: (state, action: PayloadAction<CalendarItem>) => {
      state.description = action.payload.description;
      state.end = action.payload.end;
      state.id = action.payload.id;
      state.level = action.payload.level;
      state.location = action.payload.location;
      state.name = action.payload.name;
      state.start = action.payload.start;
      state.status = action.payload.status;
    },
  },
});

export const { setDescription, setName, setStart, setEnd, setLevel, setLocation, setStatus, clearData, setData } =
  createCalendarSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default createCalendarSlice.reducer;
