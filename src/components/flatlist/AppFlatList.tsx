import * as React from 'react';
import { FlatList } from 'react-native';

type IProps = React.ComponentProps<typeof FlatList>;

const AppFlatList: React.FC<IProps> = props => {
  //Set background here
  const propsWithTheme = {
    ...props,
    style: [props.style],
  };

  return <FlatList {...propsWithTheme} />;
};

export default AppFlatList;
