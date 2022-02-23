import * as React from 'react';
import { AppView } from 'components';
import styles from 'features/todolist-event/style';
import { useTheme } from 'react-native-paper';
import TodoUpdateHeader from './components/header/TodoUpdateHeader';
import TitleInput from './components/title-input/TitleInput';
import TodoUpdateDateTimePriority from './components/datetime-priority-input/TodoUpdateDateTimePriority';
import TodoUpdateButton from './components/button/TodoUpdateButton';
import { Keyboard, View } from 'react-native';
import DescriptionInput from './components/description-input/DescriptionInput';
import { translate, checkNull } from 'utils';
import moment from 'moment';
import { useAppSelector } from 'app/hooks';

const TodoUpdate: React.FC = () => {
  const theme = useTheme();
  const [titleError, setTitleError] = React.useState({ isError: false, desc: '' });
  const [dateError, setDateError] = React.useState({ isError: false, desc: '' });
  const [descError, setDescError] = React.useState({ isError: false, desc: '' });
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
  const createdAt = useAppSelector(state => state.todoEventState.createdAt);
  const isViewDetail = useAppSelector(state => state.todoEventState.isViewDetail);

  const disableCondition = moment(createdAt).isBefore(moment()) && isStartEdited === false;

  const clearError = () => {
    setTitleError({ isError: false, desc: '' });
    setDateError({ isError: false, desc: '' });
    setDescError({ isError: false, desc: '' });
    setIsStartEdited(false);
  };

  const validateTime = (date: Date | string) => {
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
        <TodoUpdateHeader disableCondition={disableCondition || isViewDetail} />
        <AppView style={styles.calendarEventContainer}>
          <TitleInput
            disableCondition={disableCondition || isViewDetail}
            validateTitle={validateTitle}
            titleError={titleError}
            setTitleError={setTitleError}
          />
          <TodoUpdateDateTimePriority
            disableCondition={disableCondition || isViewDetail}
            validateTime={validateTime}
            dateError={dateError}
            setDateError={setDateError}
            setIsStartEdited={setIsStartEdited}
          />
          <DescriptionInput
            descError={descError}
            setDescError={setDescError}
            validateDesc={validateDesc}
            disableCondition={disableCondition || isViewDetail}
          />
          {!disableCondition && !isViewDetail ? (
            <TodoUpdateButton
              validateTitle={validateTitle}
              validateDesc={validateDesc}
              validateTime={validateTime}
              clearError={clearError}
            />
          ) : null}
        </AppView>
      </AppView>
    </View>
  );
};

export default TodoUpdate;
