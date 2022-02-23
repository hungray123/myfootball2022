import { useNavigation } from '@react-navigation/core';
import { AppMaterialIcon, AppText, AppTouchableOpacity, AppView } from 'components';
import styles from 'features/todolist-event/style';
import { clearTodoEventData } from 'features/todolist-event/todoEventSlice';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';

const TodoEventHeader: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const closePress = () => {
    navigation.goBack();
    dispatch(clearTodoEventData());
  };
  return (
    <AppView style={[styles.headerContainer, { borderBottomColor: theme.colors.borderGrey }]}>
      <AppText boldOrLight="bold" style={styles.headerText}>
        {translate('create_todo_event')}
      </AppText>
      <AppTouchableOpacity onPress={closePress} style={styles.closeButton}>
        <AppMaterialIcon name="close" color="black" size={25} />
      </AppTouchableOpacity>
    </AppView>
  );
};

export default TodoEventHeader;
