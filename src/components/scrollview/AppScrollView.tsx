import * as React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export type AppScrollViewProps = ScrollViewProps;

const AppScrollView: React.FC<AppScrollViewProps> = props => {
  //Set background here
  const propsWithTheme = {
    ...props,
  };
  return <ScrollView {...propsWithTheme}>{propsWithTheme.children}</ScrollView>;
};

export default AppScrollView;
