import { useAppSelector } from 'app/hooks';
import { AppHelperText, AppTextInput, AppView } from 'components';
import { setDescription } from 'features/create-calendar/featureSlice';
import styles from 'features/create-calendar/style';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';

const DescriptionInput: React.FC = () => {
  const dispatch = useDispatch();
  const description: string = useAppSelector(state => state.createCalendarState.description);
  const setEventDescription = (text: string) => {
    dispatch(setDescription(text));
  };
  const theme = useTheme();
  return (
    <AppView>
      <AppTextInput
        outlineColor={theme.colors.lightGrey}
        value={description}
        onChangeText={setEventDescription}
        style={styles.textInput}
        multiline={true}
        maxLength={300}
        numberOfLines={5}
        placeholder={translate('create_calendar_description')}
        mode="outlined"
      />
      <AppHelperText type="error" visible={false} children="" />
    </AppView>
  );
};

export default DescriptionInput;
