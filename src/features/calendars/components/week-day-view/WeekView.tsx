import { useNavigation } from '@react-navigation/core';
import { AppView } from 'components';
import { setData } from 'features/create-calendar/featureSlice';
import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Calendar } from '../big-calendar';
import 'dayjs/locale/vi';
import { checkNullOrEmpty } from 'utils';
import { useAppSelector } from 'app/hooks';
import { CalendarItem } from 'app/type';
import moment from 'moment';
import { appConstants } from 'constants/const';

const height = Dimensions.get('window').height;
const WeekView: React.FC = () => {
  const navigation = useNavigation();
  const calendarDataById = useAppSelector(state => state.calendarState.calendarDataById);
  const dispatch = useDispatch();
  const handlePress = (event: CalendarItem) => {
    const initialData = {
      description: '',
      end: moment().toJSON(),
      id: '',
      level: appConstants.PRIORITY.HIGH,
      location: '',
      name: '',
      start: moment().toJSON(),
      status: '',
      type: '',
    };
    navigation.navigate('UpdateCalendar' as never);
    const eventData = calendarDataById ? calendarDataById[event.id] : initialData;
    dispatch(setData(eventData));
  };
  const calendarData = useAppSelector(state => state.calendarState.displayData);
  const displayCalendar = checkNullOrEmpty(calendarData) ? [] : calendarData;
  return (
    <AppView style={styles.container}>
      <Calendar
        style={styles.calendar}
        height={height}
        events={displayCalendar}
        mode="week"
        weekStartsOn={1}
        locale="vi"
        swipeEnabled={true}
        onPressEvent={handlePress}
      />
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 450,
  },
  calendar: {
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default WeekView;
