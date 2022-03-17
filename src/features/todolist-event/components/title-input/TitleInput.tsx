import { AppHelperText, AppTextInput, AppView } from 'components';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';
import styles from 'features/todolist-event/style';
import { useTheme } from 'react-native-paper';
import { setSubject } from 'features/todolist-event/todoEventSlice';
import { IEventDialogTitleInput } from 'app/type';
import { useAppSelector } from 'app/hooks';

const TitleInput: React.FC<IEventDialogTitleInput> = (props: IEventDialogTitleInput) => {
  const subject: string = useAppSelector(state => state.todoEventState.subject);
  const dispatch = useDispatch();
  const setTodoSubject = (text: string) => {
    dispatch(setSubject(text));
  };
  const theme = useTheme();
  return (
    <AppView>
      <AppTextInput
        outlineColor={theme.colors.lightGrey}
        onFocus={() => props.setTitleError({ isError: false, desc: '' })}
        value={subject}
        maxLength={200}
        onChangeText={setTodoSubject}
        style={styles.textInput}
        placeholder={translate('todo_event_title')}
        mode="outlined"
        onBlur={() => props.validateTitle(subject)}
      />
      <AppHelperText
        style={styles.helperText}
        type="error"
        visible={props.titleError.isError}
        children={props.titleError.desc}
      />
    </AppView>
  );
};

export default TitleInput;
