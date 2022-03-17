import * as React from 'react';
import {Image, ImageProps} from 'react-native';

const AppImage: React.FC<ImageProps> = props => {
  // //Set background here
  // const theme: ReactNativePaper.Theme = useTheme();
  // const { colors } = theme;
  // const propsWithTheme = {
  //     ...props,
  //     style: [
  //         props.style,
  //         {
  //             backgroundColor: colors.background,
  //         },
  //     ],
  // };

  return <Image {...props}>{props.children}</Image>;
};

export default AppImage;
