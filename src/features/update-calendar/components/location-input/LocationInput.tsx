import { useAppSelector } from 'app/hooks';
import { IEventDialogDescriptionInput } from 'app/type';
import { AppHelperText, AppTextInput, AppView } from 'components';
import { setLocation } from 'features/create-calendar/featureSlice';
import styles from 'features/create-calendar/style';
import * as React from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';

const LocationInput: React.FC<IEventDialogDescriptionInput> = (props: IEventDialogDescriptionInput) => {
  const dispatch = useDispatch();
  const location: string = useAppSelector(state => state.createCalendarState.location);
  const setLocationEvent = (text: string) => {
    dispatch(setLocation(text));
  };
  const theme = useTheme();
  return (
    <AppView>
      <AppTextInput
        right={<TextInput.Icon name="map-marker" color={theme.colors.primaryBlue} />}
        outlineColor={theme.colors.lightGrey}
        editable={!props.disableCondition}
        value={location}
        onChangeText={setLocationEvent}
        style={styles.textInput}
        placeholder={translate('location')}
        mode="outlined"
        maxLength={300}
      />
      <AppHelperText type="error" visible={false} children="" />
    </AppView>
  );
};

export default LocationInput;
