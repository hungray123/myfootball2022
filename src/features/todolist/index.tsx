import { useNavigation } from '@react-navigation/native';
import {
  AppFlatList,
  AppFontAwesomeIcon,
  AppText,
  AppTouchableOpacity,
  AppView,
  AppViewWithErrorAndLoading,
} from 'components';
import { AppError, CalendarItem } from 'app/type';
import * as React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { batch, useDispatch } from 'react-redux';
import { translate } from 'utils';
import TodoListItem from './components/todolist-item/TodoListItem';
import styles from './style';
import {
  getCalendarFullData,
  setCalendarFullData,
  setErrorCalendar,
  setLoadingCalendarList,
} from 'features/calendars/calendarsSlice';
import { useAppSelector } from 'app/hooks';

const TodoList: React.FC = () => {
  const errorCalendar = useAppSelector(state => state.calendarState.errorCalendar);
  const data = useAppSelector(state => state.calendarState.todoData);
  const loading = useAppSelector(state => state.calendarState.loadingList);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();
  const renderItem = (item: CalendarItem) => {
    return <TodoListItem item={item} />;
  };
  const renderEmpty = () => {
    return (
      <AppView style={styles.noData}>
        <AppText>{translate('no_data')}</AppText>
      </AppView>
    );
  };

  const refreshData = () => {
    batch(() => {
      dispatch(setErrorCalendar(''));
      dispatch(setLoadingCalendarList(true));
    });
    getCalendarFullData()
      .then(res => {
        dispatch(setCalendarFullData(res));
      })
      .catch(error => {
        const message = (error as AppError).message as string;
        batch(() => {
          dispatch(setLoadingCalendarList(false));
          dispatch(setErrorCalendar(message));
        });
      });
  };
  return (
    <AppViewWithErrorAndLoading
      loading={false}
      errorString={errorCalendar}
      styleError={[styles.error, { backgroundColor: theme.colors.white }]}
      style={styles.baseFlex}
      retryPress={refreshData}>
      <AppView
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.white,
          },
        ]}>
        {loading ? (
          <AppView style={[styles.loading, { backgroundColor: theme.colors.black + '20' }]}>
            <ActivityIndicator animating={true} color={theme.colors.primary} />
          </AppView>
        ) : null}
        <AppView
          style={[
            styles.headerContainer,
            {
              borderBottomColor: theme.colors.borderGrey,
              backgroundColor: theme.colors.white,
            },
          ]}>
          <AppText boldOrLight="bold" style={styles.listTodoTitle}>
            {translate('todo_list')}
          </AppText>
          <AppTouchableOpacity
            onPress={() => navigation.navigate('CreateTodoEvent' as never)}
            style={[styles.createTodoButton, { backgroundColor: theme.colors.primaryBlue }]}>
            <AppFontAwesomeIcon name="plus-circle" color={theme.colors.white} size={20} />
          </AppTouchableOpacity>
        </AppView>

        <AppView style={styles.listTodo}>
          <AppFlatList
            onRefresh={refreshData}
            removeClippedSubviews={true}
            initialNumToRender={7}
            windowSize={7}
            maxToRenderPerBatch={6}
            refreshing={false}
            ListEmptyComponent={renderEmpty}
            nestedScrollEnabled={true}
            data={data}
            renderItem={({ item }) => renderItem(item as CalendarItem)}
          />
        </AppView>
      </AppView>
    </AppViewWithErrorAndLoading>
  );
};

export default TodoList;
