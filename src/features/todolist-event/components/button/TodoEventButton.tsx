import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from 'app/hooks';
import { AppError, IEventDialogButton, TodoEvent } from 'app/type';
import { AppButton, AppView } from 'components';
import { useDialog } from 'components/dialog/AppDialogContext';
import { useAppUser } from 'context/AppUserContext';
import { getCalendarFullData, setCalendarFullData, setLoadingCalendarList } from 'features/calendars/calendarsSlice';
import styles from 'features/todolist-event/style';
import { todoEventApi } from 'features/todolist-event/todoEventApi';
import { clearTodoEventData, TodoEventState } from 'features/todolist-event/todoEventSlice';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';

const TodoEventButton: React.FC<IEventDialogButton> = (props: IEventDialogButton) => {
  const todoEvent: TodoEventState = useAppSelector(state => state.todoEventState);
  const loading: boolean = useAppSelector(state => state.todoEventState.loadingCreate);
  const dispatch = useDispatch();
  const { showDialog } = useDialog();
  const navigation = useNavigation();
  const appUser = useAppUser();
  const { getBasiclUserLoginInfo } = appUser;
  const user = getBasiclUserLoginInfo();
  const hrsCode = user?.hrsCode ? user.hrsCode : '';
  const getCalendarData = () => {
    dispatch(setLoadingCalendarList(true));
    getCalendarFullData()
      .then(res => {
        dispatch(setCalendarFullData(res));
      })
      .catch(error => {
        dispatch(setLoadingCalendarList(false));
        const message = (error as AppError).message as string;
        showDialog({
          dialogType: 'error',
          message: message,
          title: translate('message'),
          description: 'description',
          buttonAccept: { onPress: () => {}, label: translate('close'), color: theme.colors.primaryBlue },
        });
      });
  };
  const onCreatePress = () => {
    const body: TodoEvent = {
      assign: [hrsCode],
      contents: [],
      createdAt: todoEvent.createdAt,
      description: todoEvent.description,
      dueDate: todoEvent.dueDate,
      followUp: [],
      level: todoEvent.level,
      subject: todoEvent.subject,
      status: '',
      refStatus: '',
      id: '',
    };
    const timeError: boolean = props.validateTime(todoEvent.createdAt);
    const titleError: boolean = props.validateTitle(todoEvent.subject);
    const descError: boolean = props.validateDesc ? props.validateDesc(todoEvent.description) : false;
    if (!timeError && !titleError && !descError) {
      todoEventApi
        .createTodo(body)
        .then(() => {
          getCalendarData();
          dispatch(clearTodoEventData());
          navigation.goBack();
          Toast.show({
            type: 'success_create',
            text1: translate('create_todo_success'),
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            position: 'bottom',
          });
        })
        .catch(error => {
          const message = (error as AppError).message as string;
          showDialog({
            dialogType: 'error',
            message: message,
            title: translate('message'),
            description: 'description',
            buttonAccept: { onPress: () => {}, label: translate('close'), color: theme.colors.primaryBlue },
          });
        });
    }
  };
  const onReinputPress = () => {
    dispatch(clearTodoEventData());
    props.clearError();
  };
  const theme = useTheme();
  return (
    <AppView style={styles.calendarButtonContainer}>
      <AppButton
        style={[
          styles.buttonContainer,
          {
            backgroundColor: theme.colors.clearBlue,
          },
        ]}
        labelStyle={[styles.buttonLabel, { color: theme.colors.black }]}
        mode="contained"
        uppercase={false}
        onPress={onReinputPress}
        children={translate('reinput')}
        disabled={loading}
      />
      <AppButton
        style={[
          styles.buttonContainer,
          {
            backgroundColor: theme.colors.primaryBlue,
          },
        ]}
        labelStyle={[styles.buttonLabel, { color: theme.colors.white }]}
        mode="contained"
        uppercase={false}
        onPress={onCreatePress}
        children={translate('create_todo_event')}
        loading={loading}
        disabled={loading}
      />
    </AppView>
  );
};

export default TodoEventButton;
