import { AppCheckBox, AppFontAwesome5Icon, AppIonicons, AppText, AppTouchableOpacity } from 'components';
import * as React from 'react';
import { View } from 'react-native';
import { Divider, Menu, useTheme } from 'react-native-paper';
import { appConstants } from 'constants/const';
import { checkEmpty, formatDateTime } from 'utils';
import styles from 'features/todolist/style';
import { translate } from 'utils';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setData } from 'features/create-calendar/featureSlice';
import { AppError, CalendarItem, TodoEvent } from 'app/type';
import { clearTodoEventData, setTodoData, setViewDetail } from 'features/todolist-event/todoEventSlice';
import { useDialog } from 'components/dialog/AppDialogContext';
import {
  getCalendarFullData,
  setCalendarFullData,
  setCalendarViewDetail,
  setLoadingCalendarList,
} from 'features/calendars/calendarsSlice';
import moment from 'moment';
import { useAppUser } from 'context/AppUserContext';
import { calendarApi } from 'features/calendars/calendarsApi';
import Toast from 'react-native-toast-message';
import { todoEventApi } from 'features/todolist-event/todoEventApi';
interface ITodoListItem {
  item: CalendarItem;
}

const TodoListItem: React.FC<ITodoListItem> = ({ item }) => {
  const status = item.status === 'DONE';
  const level = item.level;
  const navigation = useNavigation();
  const { showDialog } = useDialog();
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(status);
  const dispatch = useDispatch();
  const appUser = useAppUser();
  const { getBasiclUserLoginInfo } = appUser;
  const user = getBasiclUserLoginInfo();
  const hrsCode = user?.hrsCode ? user.hrsCode : '';

  const openMenu = () => setVisible(true);
  const navigateScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };
  const closeMenu = () => setVisible(false);
  const formatDate = () => {
    if (checkEmpty(item.start)) {
      return formatDateTime(item.end.toString(), appConstants.FORMAT_DATE_TIME.HH_MM_DD_MM_YYYY);
    }
    if (checkEmpty(item.end)) {
      return formatDateTime(item.start.toString(), appConstants.FORMAT_DATE_TIME.HH_MM_DD_MM_YYYY);
    }
    return `${formatDateTime(item.start.toString(), appConstants.FORMAT_DATE_TIME.HH_MM_DD_MM_YYYY)}-${formatDateTime(
      item.end.toString(),
      appConstants.FORMAT_DATE_TIME.HH_MM_DD_MM_YYYY,
    )}`;
  };

  const onUpdatePress = () => {
    if (item.type === 'TD') {
      navigateScreen('UpdateTodo');
      dispatch(setTodoData(item));
    } else {
      navigateScreen('UpdateCalendar');
      dispatch(setData(item));
    }
    closeMenu();
  };
  const disable = moment(item.start).isBefore(moment());

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

  const deleteCalendar = () => {
    calendarApi
      .deleteCalendarEvent(item.id)
      .then(() => {
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
  };

  const deleteTodoList = () => {
    todoEventApi
      .deleteTodo(item.id)
      .then(() => {
        getCalendarData();
        dispatch(clearTodoEventData());
        Toast.show({
          type: 'success_create',
          text1: translate('delete_todo_success'),
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
  };

  const onDeletePress = () => {
    if (item.type === 'TD') {
      showDialog({
        dialogType: 'error',
        message: translate('delete_todo_event_description'),
        title: translate('message'),
        description: 'description',
        buttonAccept: {
          onPress: () => {
            deleteTodoList();
          },
          label: translate('delete'),
          color: theme.colors.darkRed,
        },
        buttonCancel: { onPress: () => {}, label: translate('close'), color: theme.colors.clearBlue },
      });
    } else {
      showDialog({
        dialogType: 'error',
        title: translate('message'),
        message: translate('delete_calendar_confirm'),
        description: 'description',
        buttonAccept: {
          onPress: () => {
            deleteCalendar();
          },
          label: translate('delete'),
          color: theme.colors.darkRed,
        },
        buttonCancel: { onPress: () => {}, label: translate('close'), color: theme.colors.clearBlue },
      });
    }
    closeMenu();
  };

  const checkboxPress = () => {
    if (!isCheck) {
      showDialog({
        dialogType: 'info',
        title: translate('message'),
        message: item.type === 'TD' ? translate('complete_todo_event') : translate('complete_calendar_event'),
        description: 'description',
        buttonAccept: {
          onPress: () => {
            updateData();
          },
          label: translate('confirm'),
          color: theme.colors.primaryBlue,
        },
        buttonCancel: { onPress: () => {}, label: translate('close'), color: theme.colors.clearBlue },
      });
    }
  };

  const displayDate = formatDate();

  const color = () => {
    switch (level) {
      case appConstants.PRIORITY.HIGH:
        const highBgColor = disable ? theme.colors.lightGrey : theme.colors.lightRed;
        return {
          backgroundColor: highBgColor,
          checkBoxColor: theme.colors.darkRed,
        };
      case appConstants.PRIORITY.MEDIUM:
        const medBgColor = disable ? theme.colors.lightGrey : theme.colors.lightYellow;
        return {
          backgroundColor: medBgColor,
          checkBoxColor: theme.colors.darkYellow,
        };
      case appConstants.PRIORITY.LOW:
        const lowBgColor = disable ? theme.colors.lightGrey : theme.colors.lightGreen;
        return {
          backgroundColor: lowBgColor,
          checkBoxColor: theme.colors.darkGreen,
        };
    }
  };

  const updateDataEvent = () => {
    setIsCheck(!isCheck);
    calendarApi
      .completeCalendarEvent(item.id)
      .then(() => {
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
  };

  const updateDataTodo = () => {
    setIsCheck(!isCheck);
    const body: TodoEvent = {
      assign: [hrsCode],
      contents: [],
      createdAt: moment(item.start.toString()).toJSON(),
      description: item.description,
      dueDate: moment(item.end.toString()).toJSON(),
      followUp: [],
      level: item.level,
      status: 'NEW',
      id: item.id,
      subject: item.name,
      refStatus: '',
    };
    todoEventApi
      .completeTodo(body)
      .then(() => {
        getCalendarData();
        Toast.show({
          type: 'success_create',
          text1: translate('update_todo_success'),
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
  };

  const updateData = () => {
    item.type === 'TD' ? updateDataTodo() : updateDataEvent();
  };

  const onPressViewDetail = () => {
    if (item.type === 'TD') {
      navigateScreen('UpdateTodo');
      dispatch(setTodoData(item));
      dispatch(setViewDetail(true));
    } else {
      navigateScreen('UpdateCalendar');
      dispatch(setData(item));
      dispatch(setCalendarViewDetail(true));
    }
  };

  const disableCondition = moment(item.start).isBefore(moment());

  const textCompleteStyle = isCheck ? 'line-through' : undefined;

  const itemColor = color();
  return (
    <AppTouchableOpacity
      onPress={onPressViewDetail}
      style={[styles.itemContainer, { backgroundColor: itemColor?.backgroundColor }]}>
      <View style={styles.checkBoxContainer}>
        <AppCheckBox
          status={isCheck ? 'checked' : 'unchecked'}
          onPress={() => checkboxPress()}
          color={itemColor?.checkBoxColor}
          uncheckedColor={itemColor?.checkBoxColor}
        />
      </View>
      <View style={styles.eventContainer}>
        <AppText
          numberOfLines={2}
          boldOrLight="bold"
          style={[styles.nameText, { textDecorationLine: textCompleteStyle }]}>
          {item.name}
        </AppText>
        <AppText numberOfLines={2} style={styles.descriptionText}>
          {item.description}
        </AppText>
        <AppText style={[styles.dateText, { color: theme.colors.grey }]}>{displayDate}</AppText>
      </View>
      <View style={styles.menuContainer}>
        {disableCondition ? null : (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <AppTouchableOpacity style={styles.menuButton} onPress={openMenu}>
                <AppIonicons name="ellipsis-vertical" color={theme.colors.grey} size={20} />
              </AppTouchableOpacity>
            }>
            <Menu.Item
              onPress={onUpdatePress}
              titleStyle={theme.fonts.regular}
              icon={() => <AppFontAwesome5Icon name="pencil-alt" color={theme.colors.primaryBlue} size={20} />}
              title={translate('update')}
            />
            {status ? null : <Divider />}
            {status ? null : (
              <Menu.Item
                onPress={onDeletePress}
                titleStyle={theme.fonts.regular}
                icon={() => <AppFontAwesome5Icon name="trash" color={theme.colors.darkRed} size={20} />}
                title={translate('delete')}
              />
            )}
          </Menu>
        )}
      </View>
    </AppTouchableOpacity>
  );
};

export default TodoListItem;
