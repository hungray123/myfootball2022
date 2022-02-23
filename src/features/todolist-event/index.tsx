import * as React from 'react';
import { AppView } from 'components';
import styles from 'features/todolist-event/style';
import { useTheme } from 'react-native-paper';
import TodoEventHeader from './components/header/TodoEventHeader';
import TitleInput from './components/title-input/TitleInput';
import TodoEventDateTimePriority from './components/datetime-priority-input/TodoEventDateTimePriority';
import TodoEventButton from './components/button/TodoEventButton';
import { Keyboard, View } from 'react-native';
import DescriptionInput from './components/description-input/DescriptionInput';
import { translate, checkNull } from 'utils';
import moment from 'moment';

const TodoListEvent: React.FC = () => {
  const theme = useTheme();
  const [titleError, setTitleError] = React.useState({ isError: false, desc: '' });
  const [descError, setDescError] = React.useState({ isError: false, desc: '' });
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
  const validateDesc = (text: string) => {
    if (checkNull(text) || !text.replace(/\s/g, '').length) {
      setDescError({ isError: true, desc: translate('description_empty_error') });
      return true;
    } else {
      setDescError({ isError: false, desc: '' });
      return false;
    }
  };

  const clearError = () => {
    setTitleError({ isError: false, desc: '' });
    setDateError({ isError: false, desc: '' });
    setDescError({ isError: false, desc: '' });
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
        <TodoEventHeader />
        <AppView style={styles.calendarEventContainer}>
          <TitleInput validateTitle={validateTitle} titleError={titleError} setTitleError={setTitleError} />
          <TodoEventDateTimePriority
            validateTime={validateTime}
            dateError={dateError}
            setDateError={setDateError}
            setIsStartEdited={setIsStartEdited}
          />
          <DescriptionInput validateDesc={validateDesc} setDescError={setDescError} descError={descError} />
          <TodoEventButton
            validateTitle={validateTitle}
            validateTime={validateTime}
            clearError={clearError}
            validateDesc={validateDesc}
          />
        </AppView>
      </AppView>
    </View>
  );
};

export default TodoListEvent;
