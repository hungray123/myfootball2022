import { useNavigation } from '@react-navigation/core';
import { AppMaterialIcon, AppText, AppTouchableOpacity, AppView } from 'components';
import { clearData } from 'features/create-calendar/featureSlice';
import styles from 'features/create-calendar/style';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { translate } from 'utils';

const CreateCalendarHeader: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const closePress = () => {
    navigation.goBack();
    dispatch(clearData());
  };
  return (
    <AppView style={[styles.headerContainer, { borderBottomColor: theme.colors.borderGrey }]}>
      <AppText boldOrLight="bold" style={styles.headerText}>
        {translate('create_calendar')}
      </AppText>
      <AppTouchableOpacity onPress={closePress} style={styles.closeButton}>
        <AppMaterialIcon name="close" color="black" size={25} />
      </AppTouchableOpacity>
    </AppView>
  );
};

export default CreateCalendarHeader;
