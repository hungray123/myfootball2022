import { useNavigation } from '@react-navigation/core';
import { AppButton, AppView } from 'components';
import { useDialog } from 'components/dialog/AppDialogContext';
import { getCalendarFullData, setCalendarFullData, setLoadingCalendarList } from 'features/calendars/calendarsSlice';
import { clearData } from 'features/create-calendar/featureSlice';
import { AppError, CalendarItem, IEventDialogButton } from 'app/type';
import styles from 'features/create-calendar/style';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';
import { useAppSelector } from 'app/hooks';
import { calendarApi } from 'features/calendars/calendarsApi';
import Toast from 'react-native-toast-message';

const CreateCalendarButton: React.FC<IEventDialogButton> = (props: IEventDialogButton) => {
  const calendarEvent = useAppSelector(state => state.createCalendarState);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { showDialog } = useDialog();
  const navigation = useNavigation();
  const onCreatePress = () => {
    const body: CalendarItem = calendarEvent;
    const timeError: boolean = props.validateTime(calendarEvent.start);
    const titleError: boolean = props.validateTitle(calendarEvent.name);
    if (!timeError && !titleError) {
      setLoading(true);
      calendarApi
        .createCalendarEvent(body)
        .then(() => {
          setLoading(false);
          Toast.show({
            type: 'success_create',
            text1: translate('create_calendar_success'),
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
          setLoading(false);
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

  const onReinputPress = () => {
    dispatch(clearData());
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
        children={translate('create_calendar')}
        loading={loading}
        disabled={loading}
      />
    </AppView>
  );
};

export default CreateCalendarButton;
