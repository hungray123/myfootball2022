import * as React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type IProps = React.ComponentProps<typeof MaterialIcon>;

const AppMaterialIcon: React.FC<IProps> = props => {
  const propsWithTheme = {
    ...props,
  };
  return <MaterialIcon {...propsWithTheme} />;
};

export default AppMaterialIcon;
