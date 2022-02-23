import * as React from 'react';
import { AppView, AppViewWithErrorAndLoading } from 'components';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { fetchChartData } from 'features/dashboard/dashboardSlice';
import { useAppUser } from 'context/AppUserContext';
import moment from 'moment';
import { appConstants } from 'constants/const';
import ChartSegment from 'features/dashboard/components/ChartSegment';
import ChartStatus from 'features/dashboard/components/ChartStatus';
import ChartClassification from 'features/dashboard/components/ChartClassification';

const Charts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { getBasiclUserLoginInfo } = useAppUser();
  const user = getBasiclUserLoginInfo();
  const loading = useAppSelector(state => state.dashboardState.loading);
  const error = useAppSelector(state => state.dashboardState.errorMessage.error);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const dateFmt = moment(currentDate).format(appConstants.FORMAT_DATE_TIME.DD_MMM_YY);
    return dateFmt;
  };
  const reloadData = () => {
    const request = {
      rmCode: user?.code,
      businessDate: getCurrentDate(),
      divisionCode: 'SME',
    };
    dispatch(fetchChartData(request))
      .then(() => {})
      .catch(() => {});
  };

  return (
    <AppViewWithErrorAndLoading
      retryPress={reloadData}
      loading={loading}
      loadingSize={'small'}
      errorString={error}
      styleLoading={[style.loadingView, { backgroundColor: colors.white }]}
      styleError={[style.loadingView, { backgroundColor: colors.white }]}>
      <AppView style={style.container}>
        <AppView style={[style.chartItem, { backgroundColor: colors.white }]}>
          <ChartSegment />
        </AppView>
        <AppView style={style.paddingView} />
        <AppView style={[style.chartItem, { backgroundColor: colors.white }]}>
          <ChartStatus />
        </AppView>
        <AppView style={style.paddingView} />
        <AppView style={[style.chartItem, { backgroundColor: colors.white }]}>
          <ChartClassification />
        </AppView>
      </AppView>
    </AppViewWithErrorAndLoading>
  );
};

const style = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
    minHeight: 560,
    height: 'auto',
    flexDirection: 'row',
  },
  chartItem: {
    flex: 1,
    borderRadius: 8,
  },
  paddingView: {
    width: 16,
  },
  loadingView: {
    height: 560,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Charts;
