import { useNavigation } from '@react-navigation/core';
import { IEventDialogHeader } from 'app/type';
import { AppMaterialIcon, AppText, AppTouchableOpacity, AppView } from 'components';
import styles from 'features/todolist-event/style';
import { clearTodoEventData } from 'features/todolist-event/todoEventSlice';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';

const TodoUpdateHeader: React.FC<IEventDialogHeader> = (props: IEventDialogHeader) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const closePress = () => {
    navigation.goBack();
    dispatch(clearTodoEventData());
  };
  const title = props.disableCondition ? translate('view_todo_detail') : translate('update_todo_event');
  return (
    <AppView style={[styles.headerContainer, { borderBottomColor: theme.colors.borderGrey }]}>
      <AppText boldOrLight="bold" style={styles.headerText}>
        {title}
      </AppText>
      <AppTouchableOpacity onPress={closePress} style={styles.closeButton}>
        <AppMaterialIcon name="close" color="black" size={25} />
      </AppTouchableOpacity>
    </AppView>
  );
};

export default TodoUpdateHeader;
