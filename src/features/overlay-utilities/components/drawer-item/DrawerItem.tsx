import { AppImage, AppText, AppTouchableOpacity } from 'components';
import styles from 'features/overlay-utilities/style';
import * as React from 'react';
import { ImageSourcePropType } from 'react-native';
import { useTheme } from 'react-native-paper';

interface IDrawerItem {
  onPress: () => void;
  icon: ImageSourcePropType;
  screenName: string;
  index: string;
}

const DrawerItem: React.FC<IDrawerItem> = ({ index, onPress, icon, screenName }: IDrawerItem) => {
  const theme = useTheme();
  const backgroundColor = index === screenName ? theme.colors.clearBlue : theme.colors.white;
  const textColor = index === screenName ? theme.colors.primaryBlue : theme.colors.black;
  return (
    <AppTouchableOpacity
      onPress={onPress}
      style={[styles.drawerItem, { backgroundColor, borderRightColor: theme.colors.borderGrey }]}>
      <AppImage style={styles.drawerItemImage} source={icon} />
      <AppText boldOrLight="bold" style={{ color: textColor }}>
        {screenName}
      </AppText>
    </AppTouchableOpacity>
  );
};

export default DrawerItem;
