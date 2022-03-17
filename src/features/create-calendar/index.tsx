import * as React from 'react';
import { AppView } from 'components';
import styles from 'features/create-calendar/style';
import { useTheme } from 'react-native-paper';
import CreateCalendarHeader from './components/header/CreateCalendarHeader';
import TitleInput from './components/title-input/TitleInput';
import DateTimePriorityInput from './components/datetime-priority-input/DateTimePriorityInput';
import CreateCalendarButton from './components/button/CreateCalendarButton';
import { Keyboard, View } from 'react-native';
import DescriptionInput from './components/description-input/DescriptionInput';
import LocationInput from './components/location-input/LocationInput';
import { translate, checkNull } from 'utils';
import _ from 'lodash';
import moment from 'moment';

const CreateCalendar: React.FC = () => {
  const theme = useTheme();
  const [titleError, setTitleError] = React.useState({ isError: false, desc: '' });
  const [dateError, setDateError] = React.useState({ isError: false, desc: '' });
  const [isStartEdited, setIsStartEdited] = React.useState(false);
  const validateTitle = (text: string) => {
    if (checkNull(text) || !text.replace(/\s/g, '').length) {
      setTitleError({ isError: true, desc: translate('calendar_title_empty') });
      return true;
    } else {
      setTitleError({ isError: false, desc: '' });
      return false;
    }
  };

  const clearError = () => {
    setTitleError({ isError: false, desc: '' });
    setDateError({ isError: false, desc: '' });
    setIsStartEdited(false);
  };

  const validateTime = (date: Date) => {
    if (moment(date).isBefore(moment()) && isStartEdited) {
      setDateError({ isError: true, desc: translate('invalid_start_time') });
      return true;
    }
    return false;
  };
  return (
    <View onStartShouldSetResponder={() => Keyboard.dismiss()} style={[styles.centeredView]}>
      <AppView
        style={[
          styles.calendarDialogcontainer,
          { borderColor: theme.colors.grey, backgroundColor: theme.colors.white },
        ]}>
        <CreateCalendarHeader />
        <AppView style={styles.calendarEventContainer}>
          <TitleInput validateTitle={validateTitle} titleError={titleError} setTitleError={setTitleError} />
          <DateTimePriorityInput
            validateTime={validateTime}
            dateError={dateError}
            setDateError={setDateError}
            setIsStartEdited={setIsStartEdited}
          />
          <DescriptionInput />
          <LocationInput />
          <CreateCalendarButton validateTitle={validateTitle} validateTime={validateTime} clearError={clearError} />
        </AppView>
      </AppView>
    </View>
  );
};

export default CreateCalendar;
