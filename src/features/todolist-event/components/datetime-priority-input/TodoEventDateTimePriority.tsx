import {
  AppDateTimePicker,
  AppFontAwesomeIcon,
  AppHelperText,
  AppText,
  AppTouchableOpacity,
  AppView,
} from 'components';
import styles from 'features/todolist-event/style';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';
import PriorityButton from '../priority-button/PriorityButton';
import moment from 'moment';
import { appConstants } from 'constants/const';
import { useTheme } from 'react-native-paper';
import { setCreatedAt, setDueDate, setLevel } from 'features/todolist-event/todoEventSlice';
import { IEventPickerInput } from 'app/type';
import { useAppSelector } from 'app/hooks';

const TodoEventDateTimePriority: React.FC<IEventPickerInput> = (props: IEventPickerInput) => {
  const createdAt: string = useAppSelector(state => state.todoEventState.createdAt);
  const dueDate: string = useAppSelector(state => state.todoEventState.dueDate);
  const [startModalVisible, setStartModalVisible] = React.useState(false);
  const [endModalVisible, setEndModalVisible] = React.useState(false);
  const [startToDate, setStartToDate] = React.useState(moment(createdAt).toDate());
  const [endToDate, setEndToDate] = React.useState(moment(dueDate).toDate());
  const dispatch = useDispatch();
  const setEventStart = (date: Date) => {
    props.validateTime(date);
    props.setIsStartEdited(true);
    dispatch(setCreatedAt(moment(date).toJSON()));
    if (moment(date).isAfter(moment(dueDate))) {
      dispatch(setDueDate(moment(date).toJSON()));
    }
    setStartModalVisible(false);
  };
  const setEventEnd = (date: Date) => {
    dispatch(setDueDate(moment(date).toJSON()));
    if (moment(date).isBefore(moment())) {
      props.validateTime(date);
      props.setIsStartEdited(true);
    }
    if (moment(date).isBefore(moment(createdAt))) {
      dispatch(setCreatedAt(moment(date).toJSON()));
    }
    setEndModalVisible(false);
  };
  const setEventLevel = (text: string) => {
    dispatch(setLevel(text));
  };
  const displayStart = moment(createdAt).format(appConstants.FORMAT_DATE_TIME.HH_MM_DD_MM_YYYY);
  const displayEnd = moment(dueDate).format(appConstants.FORMAT_DATE_TIME.HH_MM_DD_MM_YYYY);
  const theme = useTheme();
  const color = theme.colors;

  React.useEffect(() => {
    if (startModalVisible === false && endModalVisible === false) {
      setStartToDate(moment(createdAt).toDate());
    }
    if (endModalVisible === false) {
      setEndToDate(moment(dueDate).toDate());
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

export default TodoEventDateTimePriority;
