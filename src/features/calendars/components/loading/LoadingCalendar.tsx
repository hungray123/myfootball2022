import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import styles from 'features/calendars/style';

const LoadingCalendar: React.FC = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.loading,
        {
          backgroundColor: theme.colors.black + '20',
        },
      ]}>
      <ActivityIndicator animating={true} color={theme.colors.primaryBlue} />
    </View>
  );
};

export default LoadingCalendar;
