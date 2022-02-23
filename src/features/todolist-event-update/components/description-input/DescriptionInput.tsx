import { useAppSelector } from 'app/hooks';
import { IEventDialogDescriptionInput } from 'app/type';
import { AppHelperText, AppTextInput, AppView } from 'components';
import styles from 'features/todolist-event/style';
import { setDescription } from 'features/todolist-event/todoEventSlice';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';

const DescriptionInput: React.FC<IEventDialogDescriptionInput> = (props: IEventDialogDescriptionInput) => {
  const dispatch = useDispatch();
  const description: string = useAppSelector(state => state.todoEventState.description);
  const setTodoDescription = (text: string) => {
    dispatch(setDescription(text));
  };
  const theme = useTheme();
  return (
    <AppView>
      <AppTextInput
        editable={!props.disableCondition}
        outlineColor={theme.colors.lightGrey}
        onFocus={() => props.setDescError({ isError: false, desc: '' })}
        value={description}
        onChangeText={setTodoDescription}
        style={styles.textInput}
        multiline={true}
        maxLength={300}
        numberOfLines={5}
        placeholder={translate('todo_event_description')}
        mode="outlined"
        onBlur={() => props.validateDesc(description)}
      />
      <AppHelperText type="error" visible={props.descError?.isError} children={props.descError?.desc} />
    </AppView>
  );
};

export default DescriptionInput;
