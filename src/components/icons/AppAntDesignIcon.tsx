import * as React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

type IProps = React.ComponentProps<typeof AntDesignIcon>;

const AppAntDesignIcon: React.FC<IProps> = props => {
  const propsWithTheme = {
    ...props,
  };
  return <AntDesignIcon {...propsWithTheme} />;
};

export default AppAntDesignIcon;
