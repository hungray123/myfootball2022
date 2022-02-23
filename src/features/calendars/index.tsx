import useEffectOnce, { useAppSelector } from 'app/hooks';
import { AppError } from 'app/type';
import { AppFontAwesomeIcon, AppText, AppTouchableOpacity, AppView, AppViewWithErrorAndLoading } from 'components';
import { appConstants } from 'constants/const';
import styles from 'features/calendars/style';
import * as React from 'react';
import moment from 'moment';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { batch, useDispatch } from 'react-redux';
import { translate } from 'utils';
import { useAppUser } from 'context/AppUserContext';
import {
  getCalendarFullData,
  setCalendarFilterData,
  setCalendarFullData,
  setErrorCalendar,
  setLoadingCalendarList,
} from './calendarsSlice';
import DayView from './components/day-view/DayView';
import CalendarHeader from './components/header/CalendarHeader';
import LoadingCalendar from './components/loading/LoadingCalendar';
import MonthView from './components/month-view/MonthView';
import WeekDayView from './components/week-day-view/WeekView';
import { fetchChartData } from 'features/dashboard/dashboardSlice';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const errorCalendar = useAppSelector(state => state.calendarState.errorCalendar);
  const [calendarPriority, setCalendarPriority] = React.useState(appConstants.PRIORITY.ALL);
  const [calendarPeriod, setCalendarPeriod] = React.useState('week');
  const [firstRun, setFirstRun] = React.useState(true);
  const [calendarType, setCalendarType] = React.useState(appConstants.CALENDAR_TYPE.ALL);
  const { getBasiclUserLoginInfo } = useAppUser();
  const user = getBasiclUserLoginInfo();
  const loading = useAppSelector(state => state.calendarState.loadingList);

  const closeDropdown = () => {
    // setOpenCalendarPeriod(false);
    // setOpenCalendarType(false);
  };

  const filterPriorityFunction = (level: string) => {
    closeDropdown();
    if (level === calendarPriority) {
      setCalendarPriority(appConstants.PRIORITY.ALL);
    } else {
      setCalendarPriority(level);
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const dateFmt = moment(currentDate).format(appConstants.FORMAT_DATE_TIME.DD_MMM_YY);
    return dateFmt;
  };

  const getCalendarData = () => {
    const request = {
      rmCode: user?.code,
      businessDate: getCurrentDate(),
      divisionCode: 'SME',
    };
    batch(() => {
      dispatch(setErrorCalendar(''));
      dispatch(setLoadingCalendarList(true));
      dispatch(fetchChartData(request));
    });
    getCalendarFullData()
      .then(res => {
        dispatch(setCalendarFullData(res));
      })
      .catch(error => {
        const message = (error as AppError).message as string;
        batch(() => {
          dispatch(setLoadingCalendarList(false));
          dispatch(setErrorCalendar(message));
        });
      });
  };

  useEffectOnce(() => {
    getCalendarData();
    setFirstRun(false);
  });

  React.useEffect(() => {
    if (firstRun === false || loading === false) {
      dispatch(setCalendarFilterData({ calendarType: calendarType, calendarPriority: calendarPriority }));
    }
  }, [calendarType, calendarPriority, loading]);

  const backgroundColorHigh: string =
    calendarPriority === appConstants.PRIORITY.HIGH ? theme.colors.lightRed : 'transparent';

  const backgroundColorMedium: string =
    calendarPriority === appConstants.PRIORITY.MEDIUM ? theme.colors.lightYellow : 'transparent';

  const backgroundColorLow: string =
    calendarPriority === appConstants.PRIORITY.LOW ? theme.colors.lightGreen : 'transparent';

  const pressDate = () => {
    setCalendarPeriod('day');
    closeDropdown();
  };

  return (
    <AppViewWithErrorAndLoading
      loading={false}
      errorString={errorCalendar}
      styleError={styles.error}
      style={styles.container}
      retryPress={getCalendarData}>
      <AppView style={styles.container}>
        {loading ? <LoadingCalendar /> : null}
        <View style={[styles.headerContainer, { borderBottomColor: theme.colors.borderGrey }]}>
          <AppText boldOrLight="bold" style={styles.titleContainer}>
            {translate('working_calendar')}
          </AppText>
          <View style={styles.priorityFilterContainer}>
            <AppTouchableOpacity
              onPress={() => filterPriorityFunction(appConstants.PRIORITY.HIGH)}
              style={[styles.priorityFilterButton, { backgroundColor: backgroundColorHigh }]}>
              <AppFontAwesomeIcon name="circle" color={theme.colors.darkRed} size={14} style={styles.dotItem} />
              <AppText style={styles.priorityText}>{translate('high_priority')}</AppText>
            </AppTouchableOpacity>
            <AppTouchableOpacity
              onPress={() => filterPriorityFunction(appConstants.PRIORITY.MEDIUM)}
              style={[styles.priorityFilterButton, { backgroundColor: backgroundColorMedium }]}>
              <AppFontAwesomeIcon name="circle" color={theme.colors.darkYellow} size={14} style={styles.dotItem} />
              <AppText style={styles.priorityText}>{translate('medium_priority')}</AppText>
            </AppTouchableOpacity>
            <AppTouchableOpacity
              onPress={() => filterPriorityFunction(appConstants.PRIORITY.LOW)}
              style={[styles.priorityFilterButton, { backgroundColor: backgroundColorLow }]}>
              <AppFontAwesomeIcon name="circle" color={theme.colors.darkGreen} size={14} style={styles.dotItem} />
              <AppText style={styles.priorityText}>{translate('low_priority')}</AppText>
            </AppTouchableOpacity>
          </View>
          <View style={styles.dropdownPlaceholder} />
        </View>
        <CalendarHeader
          calendarType={calendarType}
          calendarPeriod={calendarPeriod}
          setCalendarType={setCalendarType}
          setCalendarPeriod={setCalendarPeriod}
        />
        <ScrollView
          nestedScrollEnabled={true}
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => getCalendarData()} />}
          style={styles.calendarViewContainer}>
          {calendarPeriod === 'month' ? (
            <MonthView onPressDate={pressDate} />
          ) : calendarPeriod === 'week' ? (
            <WeekDayView />
          ) : (
            <DayView />
          )}
        </ScrollView>
      </AppView>
    </AppViewWithErrorAndLoading>
  );
};

export default Calendar;
