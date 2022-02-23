import * as React from 'react';
import DropdownPicker from 'react-native-dropdown-picker';

type IProps = React.ComponentProps<typeof DropdownPicker>;

const AppDropdownPicker: React.FC<IProps> = props => {
  const propsWithTheme = {
    ...props,
  };
  return <DropdownPicker {...propsWithTheme} />;
};

export default AppDropdownPicker;
