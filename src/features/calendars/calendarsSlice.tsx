import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appConstants } from 'constants/const';
import { calendarApi } from './calendarsApi';
import _ from 'lodash';
import moment from 'moment';
import { checkNull, handleException } from 'utils';
import { CalendarItem, CalendarItemByIds, TodoItem } from 'app/type';
// Define a type for the slice state
interface CalendarState {
  calendarData: Array<CalendarItem>;
  displayData: Array<CalendarItem>;
  loadingList: boolean;
  calendarDataById: CalendarItemByIds;
  date: string;
  todoData: Array<CalendarItem>;
  isCalendarViewDetail: boolean;
  errorCalendar: string;
}

interface IGetCalendarData {
  dataTodo: Array<CalendarItem>;
  dataEvent: Array<CalendarItem>;
  calendarDataById: CalendarItemByIds;
}

const filterCalendarData = (payload: CalendarItem[], type: string, level: string): CalendarItem[] => {
  try {
    const filter = _.filter(payload, function (o: CalendarItem) {
      if (type === appConstants.CALENDAR_TYPE.ALL) {
        if (level === appConstants.PRIORITY.ALL) {
          return o;
        } else {
          return o.level === level;
        }
      } else {
        if (level === appConstants.PRIORITY.ALL) {
          return o.type === type;
        } else {
          return o.type === type && o.level === level;
        }
      }
    });

    return filter;
  } catch (e) {
    return [];
  }
};

const mapTodoToCalendarObject = (data: TodoItem[]): CalendarItem[] => {
  const mappingData = _.map(
    data,
    (o: TodoItem): CalendarItem => ({
      id: o.id,
      start: o.createdAt,
      end: o.dueDate,
      name: o.subject,
      description: o.description,
      level: o.level,
      status: o.refStatus,
      updatedDate: o.updatedAt,
      type: o.type,
      location: '',
    }),
  );
  return mappingData;
};

const getFilterTodoData = (payload: CalendarItem[]): CalendarItem[] => {
  const weekData = _(payload)
    .filter(function (o: CalendarItem) {
      if (checkNull(o.id)) {
        return false;
      } else {
        return o.type === 'CALENDAR' || o.type === 'HD' || o.type === 'TD';
      }
    })
    .filter(function (o) {
      if (checkNull(o.start)) {
        return false;
      } else {
        const now = moment();
        const start = moment(o.start.toString());
        if (now < start) {
          const tempNow = now.format('DD-MM-YYYY');
          const tempStart = start.format('DD-MM-YYYY');
          return tempNow === tempStart;
        } else {
          const diff = now.diff(start, 'day');
          return diff < 7;
        }
      }
    });

  const filterNew: CalendarItem[] = _(weekData)
    .filter(function (o: CalendarItem) {
      return o.status !== 'DONE';
    })
    .orderBy(['start'], ['desc'])
    .sortBy((item: CalendarItem) => ['HIGH', 'MEDIUM', 'LOW'].indexOf(item.level));

  const filterDone: CalendarItem[] = _(weekData)
    .filter(function (o: CalendarItem) {
      if (o.status === 'DONE') {
        if (checkNull(o.updatedDate)) {
          return;
        } else {
          const now = moment();
          const update = o.updatedDate ? moment(o.updatedDate.toString()) : '';
          return now.diff(update, 'day') < 1;
        }
      } else {
        return;
      }
    })
    .orderBy(['start'], ['desc'])
    .sortBy((item: CalendarItem) => ['HIGH', 'MEDIUM', 'LOW'].indexOf(item.level));

  const mergeData = [...filterNew, ...filterDone];
  return mergeData;
};

export const getCalendarFullData = async (): Promise<IGetCalendarData> => {
  try {
    const getListCalendar = await calendarApi.getCalendarList();
    const getListTodo = await calendarApi.getTodoList();
    const { content } = getListTodo;
    const dataRawTodo = content;
    const dataEvent: CalendarItem[] = getListCalendar;
    const mapDataTodo = mapTodoToCalendarObject(dataRawTodo);
    const dataTodo = getFilterTodoData([...dataEvent, ...mapDataTodo]);

    const calendarDataByKey = _.keyBy(getListCalendar, 'id');

    return {
      dataTodo: dataTodo,
      dataEvent: dataEvent,
      calendarDataById: calendarDataByKey,
    };
  } catch (error) {
    handleException(error);
    throw error;
  }
};

interface FilterType {
  calendarType: string;
  calendarPriority: string;
}

// Define the initial state using that type
const initialState: CalendarState = {
  calendarData: [],
  displayData: [],
  calendarDataById: {},
  loadingList: false,
  date: moment().toJSON(),
  todoData: [],
  isCalendarViewDetail: false,
  errorCalendar: '',
};

export const calendarsSlice = createSlice({
  name: 'calendar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearCalendarState: state => {
      state.calendarData = [];
      state.displayData = [];
      state.calendarDataById = {};
      state.loadingList = false;
      state.date = moment().toJSON();
      state.isCalendarViewDetail = false;
    },
    setCalendarFilterData: (state, action: PayloadAction<FilterType>) => {
      state.displayData = filterCalendarData(
        state.calendarData,
        action.payload.calendarType,
        action.payload.calendarPriority,
      );
    },
    setChosenDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setCalendarViewDetail: (state, action: PayloadAction<boolean>) => {
      state.isCalendarViewDetail = action.payload;
    },
    setLoadingCalendarList: (state, action: PayloadAction<boolean>) => {
      state.loadingList = action.payload;
    },
    setCalendarFullData: (state, action: PayloadAction<IGetCalendarData>) => {
      state.calendarData = action.payload.dataEvent;
      state.todoData = action.payload.dataTodo;
      state.loadingList = false;
      state.calendarDataById = action.payload.calendarDataById;
    },
    setErrorCalendar: (state, action: PayloadAction<string>) => {
      state.errorCalendar = action.payload;
    },
  },
});

export const {
  setCalendarFilterData,
  clearCalendarState,
  setChosenDate,
  setCalendarViewDetail,
  setLoadingCalendarList,
  setCalendarFullData,
  setErrorCalendar,
} = calendarsSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default calendarsSlice.reducer;
