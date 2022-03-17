import * as React from 'react';
import { TextInput, useTheme } from 'react-native-paper';

type IProps = React.ComponentProps<typeof TextInput>;

const AppTextInput: React.FC<IProps> = props => {
  const theme = useTheme();
  const textInputTheme = { colors: { background: 'white' } };

  const propsWithTheme = {
    ...props,
    // style: [
    //     props.style,
    //     {
    //         backgroundColor: colors.Neutral[5],
    //     },
    // ],
  };
  return (
    <TextInput theme={textInputTheme} {...propsWithTheme}>
      {propsWithTheme.children}
    </TextInput>
  );
};

export default AppTextInput;
