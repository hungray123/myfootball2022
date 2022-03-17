import { AppHelperText, AppTextInput, AppView } from 'components';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';
import { setName } from 'features/create-calendar/featureSlice';
import styles from 'features/create-calendar/style';
import { useTheme } from 'react-native-paper';
import { IEventDialogTitleInput } from 'app/type';
import { useAppSelector } from 'app/hooks';

const TitleInput: React.FC<IEventDialogTitleInput> = (props: IEventDialogTitleInput) => {
  const name: string = useAppSelector(state => state.createCalendarState.name);
  const dispatch = useDispatch();
  const setEventName = (text: string) => {
    dispatch(setName(text));
  };
  const theme = useTheme();
  return (
    <AppView>
      <AppTextInput
        outlineColor={theme.colors.lightGrey}
        editable={!props.disableCondition}
        onFocus={() => props.setTitleError({ isError: false, desc: '' })}
        value={name}
        maxLength={300}
        onChangeText={setEventName}
        style={styles.textInput}
        placeholder={translate('create_calendar_title')}
        mode="outlined"
        onBlur={() => props.validateTitle(name)}
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
