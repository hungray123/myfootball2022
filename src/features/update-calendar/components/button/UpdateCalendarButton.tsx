import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from 'app/hooks';
import { AppError, CalendarItem, IEventDialogButton } from 'app/type';
import { AppButton, AppView } from 'components';
import { useDialog } from 'components/dialog/AppDialogContext';
import { calendarApi } from 'features/calendars/calendarsApi';
import { getCalendarFullData, setCalendarFullData, setLoadingCalendarList } from 'features/calendars/calendarsSlice';
import { clearData } from 'features/create-calendar/featureSlice';
import styles from 'features/create-calendar/style';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';

const UpdateCalendarButton: React.FC<IEventDialogButton> = (props: IEventDialogButton) => {
  const calendarEvent: CalendarItem = useAppSelector(state => state.createCalendarState);
  const dispatch = useDispatch();
  const { showDialog } = useDialog();
  const navigation = useNavigation();
  const theme = useTheme();
  const [loadingUpdate, setLoadingUpdate] = React.useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = React.useState<boolean>(false);
  const loading = loadingUpdate || loadingDelete;
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
  const onUpdatePress = () => {
    setLoadingUpdate(true);
    const body: CalendarItem = calendarEvent;
    const timeError: boolean = props.validateTime(calendarEvent.start);
    const titleError: boolean = props.validateTitle(calendarEvent.name);
    if (!timeError && !titleError) {
      calendarApi
        .updateCalendarEvent(body)
        .then(() => {
          setLoadingUpdate(false);
          Toast.show({
            type: 'success_create',
            text1: translate('update_calendar_success'),
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            position: 'bottom',
          });
          getCalendarData();
          dispatch(clearData());
          navigation.goBack();
        })
        .catch(error => {
          setLoadingUpdate(false);
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

  const onDeletePress = () => {
    setLoadingDelete(true);
    const timeError: boolean = props.validateTime(calendarEvent.start);
    const titleError: boolean = props.validateTitle(calendarEvent.name);
    if (!timeError && !titleError) {
      calendarApi
        .deleteCalendarEvent(calendarEvent.id)
        .then(() => {
          setLoadingDelete(false);
          Toast.show({
            type: 'success_create',
            text1: translate('delete_calendar_success'),
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            position: 'bottom',
          });
          getCalendarData();
          dispatch(clearData());
          navigation.goBack();
        })
        .catch(error => {
          setLoadingDelete(false);
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

  const openDialog = () => {
    showDialog({
      dialogType: 'error',
      title: translate('delete_calendar'),
      message: translate('delete_calendar_confirm'),
      description: 'description',
      buttonAccept: {
        onPress: () => {
          onDeletePress();
        },
        label: translate('delete'),
        color: theme.colors.darkRed,
      },
      buttonCancel: { onPress: () => {}, label: translate('close'), color: theme.colors.clearBlue },
    });
  };

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
        onPress={openDialog}
        children={translate('delete_calendar')}
        loading={loadingDelete}
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
        onPress={onUpdatePress}
        children={translate('update_calendar')}
        loading={loadingUpdate}
        disabled={loading}
      />
    </AppView>
  );
};

export default UpdateCalendarButton;
