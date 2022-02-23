import { useNavigation } from '@react-navigation/core';
import { IEventDialogHeader } from 'app/type';
import { AppMaterialIcon, AppText, AppTouchableOpacity, AppView } from 'components';
import { setCalendarViewDetail } from 'features/calendars/calendarsSlice';
import { clearData } from 'features/create-calendar/featureSlice';
import styles from 'features/create-calendar/style';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';

const UpdateCalendarHeader: React.FC<IEventDialogHeader> = (props: IEventDialogHeader) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const closePress = () => {
    navigation.goBack();
    dispatch(clearData());
    dispatch(setCalendarViewDetail(false));
  };

  const headerTitle = props.disableCondition ? translate('update_calendar_header') : translate('update_calendar');
  const theme = useTheme();
  return (
    <AppView style={[styles.headerContainer, { borderBottomColor: theme.colors.borderGrey }]}>
      <AppText boldOrLight="bold" style={styles.headerText}>
        {headerTitle}
      </AppText>
      <AppTouchableOpacity onPress={closePress} style={styles.closeButton}>
        <AppMaterialIcon name="close" color="black" size={25} />
      </AppTouchableOpacity>
    </AppView>
  );
};

export default UpdateCalendarHeader;
