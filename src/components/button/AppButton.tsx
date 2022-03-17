import * as React from 'react';
import { Button, useTheme } from 'react-native-paper';

type IProps = React.ComponentProps<typeof Button>;

const AppButton: React.FC<IProps> = props => {
  const theme = useTheme();
  const propsWithTheme = {
    ...props,
    theme,
  };
  return <Button {...propsWithTheme} />;
};

export default AppButton;
