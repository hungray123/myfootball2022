import * as React from 'react';
import { HelperText, useTheme } from 'react-native-paper';

type IProps = React.ComponentProps<typeof HelperText> & {
  boldOrLight?: 'normal' | 'bold' | 'light';
};

const AppHelperText: React.FC<IProps> = props => {
  const theme = useTheme();
  const { boldOrLight } = props;
  let font = theme.fonts.regular;

  if (boldOrLight && boldOrLight === 'bold') {
    font = theme.fonts.bold;
  } else if (boldOrLight && boldOrLight === 'light') {
    font = theme.fonts.light;
  }

  const propsWithTheme = {
    ...props,
    style: [
      props.style,
      {
        fontFamily: font.fontFamily,
        fontWeight: font.fontWeight,
      },
    ],
    theme,
  };
  return <HelperText {...propsWithTheme} />;
};

export default AppHelperText;
