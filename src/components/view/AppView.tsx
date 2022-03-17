import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';

export type AppViewProps = ViewProps;

const AppView: React.FC<AppViewProps> = props => {
  //Set background here
  const theme: ReactNativePaper.Theme = useTheme();
  const { colors } = theme;
  const propsWithTheme = {
    ...props,
    // style: [
    //     props.style,
    //     {
    //         backgroundColor: colors.background,
    //     },
    // ],
  };
  return <View {...propsWithTheme}>{propsWithTheme.children}</View>;
};

export default AppView;
