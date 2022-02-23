import * as React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type IProps = React.ComponentProps<typeof FontAwesome5Icon>;

const AppFontAwesome5Icon: React.FC<IProps> = props => {
  const propsWithTheme = {
    ...props,
  };
  return <FontAwesome5Icon {...propsWithTheme} />;
};

export default AppFontAwesome5Icon;
