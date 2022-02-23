import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { TextInput } from 'react-native';

type IProps = React.ComponentProps<typeof TextInput>;

const RNAppTextInput: React.FC<IProps> = props => {
  const theme = useTheme();

  const propsWithTheme = {
    ...props,
    // style: [
    //     props.style,
    //     {
    //         backgroundColor: colors.Neutral[5],
    //     },
    // ],
    theme,
  };
  return <TextInput {...propsWithTheme}>{propsWithTheme.children}</TextInput>;
};

export default RNAppTextInput;
