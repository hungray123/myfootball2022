import {
  AppDateTimePicker,
  AppFontAwesomeIcon,
  AppHelperText,
  AppText,
  AppTouchableOpacity,
  AppView,
} from 'components';
import styles from 'features/create-calendar/style';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';
import PriorityButton from '../priority-button/PriorityButton';
import moment from 'moment';
import { setEnd, setLevel, setStart } from 'features/create-calendar/featureSlice';
import { appConstants } from 'constants/const';
import { useTheme } from 'react-native-paper';
import { IEventPickerInput } from 'app/type';
import { useAppSelector } from 'app/hooks';

const DateTimePriorityInput: React.FC<IEventPickerInput> = (props: IEventPickerInput) => {
  const start: string = useAppSelector(state => state.createCalendarState.start);
  const end: string = useAppSelector(state => state.createCalendarState.end);
  const [startModalVisible, setStartModalVisible] = React.useState(false);
  const [endModalVisible, setEndModalVisible] = React.useState(false);
  const [startToDate, setStartToDate] = React.useState(moment(start).toDate());
  const [endToDate, setEndToDate] = React.useState(moment(end).toDate());
  const dispatch = useDispatch();
  const setEventStart = (date: Date) => {
    props.validateTime(date);
    props.setIsStartEdited(true);
    dispatch(setStart(moment(date).toJSON()));
    if (moment(date).isAfter(moment(end))) {
      dispatch(setEnd(moment(date).toJSON()));
    }
    setStartModalVisible(false);
  };
  const setEventEnd = (date: Date) => {
    dispatch(setEnd(moment(date).toJSON()));
    if (moment(date).isBefore(moment())) {
      props.validateTime(date);
      props.setIsStartEdited(true);
    }
    if (moment(date).isBefore(moment(start))) {
      dispatch(setStart(moment(date).toJSON()));
    }
    setEndModalVisible(false);
  };
  const setEventLevel = (text: string) => {
    dispatch(setLevel(text));
  };
  const displayStart = moment(start).format(appConstants.FORMAT_DATE_TIME.HH_MM_DD_MM_YYYY);
  const displayEnd = moment(end).format(appConstants.FORMAT_DATE_TIME.HH_MM_DD_MM_YYYY);
  const theme = useTheme();
  const color = theme.colors;

  React.useEffect(() => {
    if (startModalVisible === false && endModalVisible === false) {
      setStartToDate(moment(start).toDate());
    }
    if (endModalVisible === false) {
      setEndToDate(moment(end).toDate());
    }
  }, [startModalVisible, endModalVisible]);

  const openStartDate = () => {
    props.setDateError({ isError: false, desc: '' });
    setStartModalVisible(true);
  };
  const openEndDate = () => {
    props.setDateError({ isError: false, desc: '' });
    setEndModalVisible(true);
  };

  return (
    <AppView>
      <AppDateTimePicker
        isVisible={startModalVisible}
        is24Hour={true}
        mode="datetime"
        date={startToDate}
        minimumDate={moment().toDate()}
        onConfirm={setEventStart}
        onCancel={() => setStartModalVisible(false)}
      />
      <AppDateTimePicker
        isVisible={endModalVisible}
        is24Hour={true}
        mode="datetime"
        date={endToDate}
        minimumDate={moment().toDate()}
        onConfirm={setEventEnd}
        onCancel={() => setEndModalVisible(false)}
      />
      <AppView style={styles.pickerRowContainer}>
        <AppView style={styles.dateContainer}>
          <AppTouchableOpacity
            onPress={openStartDate}
            style={[styles.dateTimeInput, { borderColor: theme.colors.lightGrey }]}>
            <AppText>{displayStart}</AppText>
            <AppFontAwesomeIcon
              name="calendar-o"
              color={theme.colors.primaryBlue}
              size={18}
              style={styles.calendarIcon}
            />
          </AppTouchableOpacity>
          <AppText style={styles.fromText}>{translate('create_calendar_end_date')}</AppText>
          <AppTouchableOpacity
            onPress={openEndDate}
            style={[styles.dateTimeInput, { borderColor: theme.colors.lightGrey }]}>
            <AppText>{displayEnd}</AppText>
            <AppFontAwesomeIcon
              name="calendar-o"
              color={theme.colors.primaryBlue}
              size={18}
              style={styles.calendarIcon}
            />
          </AppTouchableOpacity>
        </AppView>
        <AppView style={styles.priorityContainer}>
          <AppText style={styles.fromText}>{translate('priority')}</AppText>
          <PriorityButton
            label={translate('high_priority_label')}
            color={color.darkRed}
            onPress={setEventLevel}
            value={appConstants.PRIORITY.HIGH}
          />
          <PriorityButton
            label={translate('medium_priority_label')}
            color={color.darkYellow}
            onPress={setEventLevel}
            value={appConstants.PRIORITY.MEDIUM}
          />
          <PriorityButton
            label={translate('low_priority_label')}
            color={color.darkGreen}
            onPress={setEventLevel}
            value={appConstants.PRIORITY.LOW}
          />
        </AppView>
      </AppView>
      <AppHelperText
        style={styles.helperText}
        type="error"
        visible={props.dateError.isError}
        children={props.dateError.desc}
      />
    </AppView>
  );
};

export default DateTimePriorityInput;
