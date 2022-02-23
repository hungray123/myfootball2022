import { useNavigation } from '@react-navigation/core';
import { AppDropdownPicker, AppFontAwesomeIcon, AppTouchableOpacity, AppView } from 'components';
import { appConstants } from 'constants/const';
import styles from 'features/calendars/style';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { translate } from 'utils';

interface ICalendarHeader {
  calendarPeriod: string;
  calendarType: string;
  setCalendarPeriod: React.Dispatch<string>;
  setCalendarType: React.Dispatch<string>;
}

const CalendarHeader: React.FC<ICalendarHeader> = ({
  calendarPeriod,
  calendarType,
  setCalendarPeriod,
  setCalendarType,
}: ICalendarHeader) => {
  const theme = useTheme();
  const [openCalendarPeriod, setOpenCalendarPeriod] = React.useState(false);
  const [openCalendarType, setOpenCalendarType] = React.useState(false);
  const [calendarPeriodList, setCalendarPeriodList] = React.useState([
    { label: translate('month'), value: 'month' },
    { label: translate('week'), value: 'week' },
    { label: translate('day'), value: 'day' },
  ]);
  const [calendarTypeList, setCalendarTypeList] = React.useState([
    { label: translate('all_type'), value: appConstants.CALENDAR_TYPE.ALL },
    { label: translate('calendar_type'), value: appConstants.CALENDAR_TYPE.CALENDAR },
    { label: translate('activity_type'), value: appConstants.CALENDAR_TYPE.ACTIVITIES },
  ]);
  const navigation = useNavigation();
  const onCreatePress = () => {
    navigation.navigate('CreateCalendar' as never);
  };
  return (
    <AppView style={styles.calendarPickerRow}>
      <AppDropdownPicker
        style={[styles.dropdownStyle, { borderColor: theme.colors.lightGrey }]}
        containerStyle={styles.dropdownContainer}
        listMode="FLATLIST"
        open={openCalendarPeriod}
        value={calendarPeriod}
        items={calendarPeriodList}
        setOpen={setOpenCalendarPeriod}
        setValue={setCalendarPeriod}
        setItems={setCalendarPeriodList}
        dropDownContainerStyle={{ borderColor: theme.colors.lightGrey }}
      />
      <AppDropdownPicker
        style={[styles.dropdownStyle, { borderColor: theme.colors.lightGrey }]}
        containerStyle={styles.calendarTypeContainer}
        open={openCalendarType}
        listMode="FLATLIST"
        value={calendarType}
        items={calendarTypeList}
        setOpen={setOpenCalendarType}
        setValue={setCalendarType}
        setItems={setCalendarTypeList}
        dropDownContainerStyle={{ borderColor: theme.colors.lightGrey }}
      />
      <AppTouchableOpacity
        onPress={onCreatePress}
        style={[styles.addButton, { backgroundColor: theme.colors.primaryBlue }]}>
        <AppFontAwesomeIcon name="plus-circle" color={theme.colors.white} size={20} />
      </AppTouchableOpacity>
    </AppView>
  );
};

export default CalendarHeader;
