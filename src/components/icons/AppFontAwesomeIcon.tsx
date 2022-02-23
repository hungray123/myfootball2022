import * as React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

type IProps = React.ComponentProps<typeof FontAwesomeIcon>;

const AppFontAwesomeIcon: React.FC<IProps> = props => {
  const propsWithTheme = {
    ...props,
  };
  return <FontAwesomeIcon {...propsWithTheme} />;
};

export default AppFontAwesomeIcon;
