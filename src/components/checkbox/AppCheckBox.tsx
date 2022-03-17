import * as React from 'react';
import { Checkbox, useTheme } from 'react-native-paper';

type IProps = React.ComponentProps<typeof Checkbox>;

const AppCheckBox: React.FC<IProps> = props => {
  const theme = useTheme();
  const propsWithTheme = {
    ...props,
    theme,
  };
  return <Checkbox {...propsWithTheme} />;
};

export default AppCheckBox;
