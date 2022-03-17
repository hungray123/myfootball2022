import { processColor, ProcessedColorValue } from 'react-native';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dashboardApi } from 'features/dashboard/dashboardApi';
import { BaseChartKeyValue, BaseChartResponse, MapCommonItemChart } from 'app/type';
import _ from 'lodash';

export type ErrorResponse = {
  error: string;
};
interface IRequestParam {
  rmCode?: string;
  businessDate: string;
  divisionCode: string;
}

const convertValue = (payload: BaseChartResponse) => {
  const unPick = {
    code: null,
    title: null,
    keyConfig: null,
  };
  const sliced = _.omit(payload, _.keys(unPick));
  const result = Object.entries(sliced).map(([label, value]) => ({ label, value }));
  return result as unknown as BaseChartKeyValue;
};

export const mappingWithComonData = (payload: BaseChartKeyValue, commonData: Array<MapCommonItemChart>) => {
  const listData = [] as BaseChartKeyValue;
  payload?.forEach(item => {
    const fillter = _.filter(commonData, function (o) {
      return o.code === item.label;
    });
    const result = fillter[0];
    if (result) {
      const srtDesc = result.description as string;
      const description = JSON.parse(srtDesc);
      listData.push({ label: result.name, value: item.value, color: description.color });
    }
  });
  return listData;
};

export const mappingDataChart = (payload: BaseChartKeyValue, commonData: Array<MapCommonItemChart>) => {
  const listData = [] as BaseChartKeyValue;
  const listColor = [] as Array<ProcessedColorValue | null | undefined>;
  let resutlData = [] as any;
  payload?.forEach(item => {
    const fillter = _.filter(commonData, function (o) {
      return o.code === item.label;
    });
    const result = fillter[0];
    if (result) {
      const srtDesc = result.description as string;
      const description = JSON.parse(srtDesc);
      if (item.value !== 0) {
        listData.push({ label: result.name, value: item.value, color: description.color });
        listColor.push(processColor(description.color));
      }
    }
  });
  resutlData = [...resutlData, listData, listColor];
  return resutlData;
};

export const fetchChartData = createAsyncThunk('dashboard/fetchChartData', async (params: IRequestParam, thunkAPI) => {
  try {
    const response = await dashboardApi.fetchChartData(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message as unknown });
  }
});

interface InterestState {
  loading: boolean;
  errorMessage: ErrorResponse;
  dataStatus: BaseChartResponse;
  dataSegment: BaseChartResponse;
  dataClassifi: BaseChartResponse;
  dataValueStatus: BaseChartKeyValue;
  dataValueSegment: BaseChartKeyValue;
  dataValueClassifi: BaseChartKeyValue;
}

const initialState: InterestState = {
  loading: false,
  errorMessage: {
    error: '',
  },
  dataStatus: {
    code: '',
    title: '',
    keyConfig: '',
  },
  dataSegment: {
    code: '',
    title: '',
    keyConfig: '',
  },
  dataClassifi: {
    code: '',
    title: '',
    keyConfig: '',
  },
  dataValueStatus: [{ label: '', value: 0, color: '' }],
  dataValueSegment: [{ label: '', value: 0, color: '' }],
  dataValueClassifi: [{ label: '', value: 0, color: '' }],
};
const dashboardSlice = createSlice({
  name: 'dashboardChart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChartData.pending, state => {
        state.loading = true;
        state.errorMessage = { error: '' };
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.dataStatus = action.payload.dashBoardStatusDTO;
        state.dataSegment = action.payload.dashBoardSegmentDTO;
        state.dataClassifi = action.payload.dashboardClassificationDTO;
        state.dataValueStatus = convertValue(action.payload.dashBoardStatusDTO);
        state.dataValueSegment = convertValue(action.payload.dashBoardSegmentDTO);
        state.dataValueClassifi = convertValue(action.payload.dashboardClassificationDTO);
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as ErrorResponse;
      });
  },
});

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
