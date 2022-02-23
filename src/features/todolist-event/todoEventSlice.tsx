import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appConstants } from 'constants/const';
import { CalendarItem } from 'app/type';
import moment from 'moment';

// Define a type for the slice state
export interface TodoEventState {
  description: string;
  dueDate: string;
  id: string;
  level: string;
  subject: string;
  createdAt: string;
  status: string;
  type: string;
  loadingCreate: boolean;
  loadingDelete: boolean;
  isViewDetail: boolean;
}

// Define the initial state using that type
const initialState: TodoEventState = {
  description: '',
  dueDate: moment().toJSON(),
  id: '',
  level: appConstants.PRIORITY.HIGH,
  subject: '',
  createdAt: moment().toJSON(),
  status: '',
  type: 'TD',
  loadingCreate: false,
  loadingDelete: false,
  isViewDetail: false,
};

export const todoEventSlice = createSlice({
  name: 'todoEvent',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCreatedAt: (state, action: PayloadAction<string>) => {
      state.createdAt = action.payload;
    },
    setDueDate: (state, action: PayloadAction<string>) => {
      state.dueDate = action.payload;
    },
    setLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setViewDetail: (state, action: PayloadAction<boolean>) => {
      state.isViewDetail = action.payload;
    },
    clearTodoEventData: state => {
      state.description = '';
      state.dueDate = moment().toJSON();
      state.id = '';
      state.level = appConstants.PRIORITY.HIGH;
      state.subject = '';
      state.createdAt = moment().toJSON();
      state.status = '';
      state.isViewDetail = false;
      state.loadingCreate = false;
      state.loadingDelete = false;
    },
    setTodoData: (state, action: PayloadAction<CalendarItem>) => {
      state.description = action.payload.description;
      state.dueDate = action.payload.end;
      state.id = action.payload.id;
      state.level = action.payload.level;
      state.subject = action.payload.name;
      state.createdAt = action.payload.start;
      state.status = action.payload.status;
      state.type = action.payload.type;
    },
  },
});

export const {
  setDescription,
  setCreatedAt,
  setDueDate,
  setSubject,
  setLevel,
  setStatus,
  clearTodoEventData,
  setTodoData,
  setViewDetail,
} = todoEventSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default todoEventSlice.reducer;
