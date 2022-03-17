import { useNavigation } from '@react-navigation/core';
import { AppDateTimePicker, AppView } from 'components';
import { setData } from 'features/create-calendar/featureSlice';
import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Calendar } from '../big-calendar';
import 'dayjs/locale/vi';
import { checkNullOrEmpty } from 'utils';
import { setChosenDate } from 'features/calendars/calendarsSlice';
import { useAppSelector } from 'app/hooks';
import moment from 'moment';
import { CalendarItem } from 'app/type';
import { appConstants } from 'constants/const';

const height = Dimensions.get('window').height;

const DayView: React.FC = () => {
  const navigation = useNavigation();
  const calendarDataById = useAppSelector(state => state.calendarState.calendarDataById);
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const dispatch = useDispatch();
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
  const handlePress = (event: CalendarItem) => {
    navigation.navigate('UpdateCalendar' as never);
    const eventData = calendarDataById ? calendarDataById[event.id] : initialData;
    dispatch(setData(eventData));
  };
  const calendarData = useAppSelector(state => state.calendarState.displayData);
  const date = useAppSelector(state => state.calendarState.date);
  const displayCalendar = checkNullOrEmpty(calendarData) ? [] : calendarData;

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (dateValue: Date) => {
    dispatch(setChosenDate(moment(dateValue).toJSON()));
    hideDatePicker();
  };

  return (
    <AppView style={styles.container}>
      <AppDateTimePicker
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Calendar
        onPressDateHeader={() => setDatePickerVisible(true)}
        style={styles.calendar}
        height={height}
        events={displayCalendar}
        mode="day"
        weekStartsOn={1}
        locale="vi"
        swipeEnabled={true}
        onPressEvent={handlePress}
        date={date}
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

export default DayView;
