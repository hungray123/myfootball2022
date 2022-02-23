import image from 'assets/icons';
import AppImage from 'components/image/AppImage';
import AppUserInfoCard from 'components/user-info-card/AppUserInfoCard';
import AppView from 'components/view/AppView';
import * as React from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';

const AppBanner: React.FC = () => {
  return (
    <AppView style={styles.container}>
      <AppImage source={image.IC_LOGO_MB as ImageSourcePropType} resizeMode="center" style={styles.logoMb} />
      <AppUserInfoCard />
      <AppView style={styles.logoContainer}>
        <AppImage source={image.APP_BANNER as ImageSourcePropType} resizeMode="center" style={styles.banner} />
      </AppView>
    </AppView>
  );
};

export default AppBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  logoContainer: {
    height: 70,
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  logoMb: {
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  banner: { height: 70 },
});
