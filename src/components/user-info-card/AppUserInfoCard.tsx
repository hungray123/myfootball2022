import { useNavigation } from '@react-navigation/core';
import image from 'assets/icons';
import AppImage from 'components/image/AppImage';
import AppText from 'components/text/AppText';
import AppTouchableOpacity from 'components/touchable-opacity/AppTouchableOpacity';

import AppView from 'components/view/AppView';
import { useAppUser } from 'context/AppUserContext';
import * as React from 'react';
import { ImageSourcePropType } from 'react-native';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setUtilitySelected } from 'features/overlay-utilities/overlaySlice';
import { appConstants } from 'constants/const';
import { COLORS } from 'assets/colors';

const AppUserInfoCard: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const appUser = useAppUser();
  const { getBasiclUserLoginInfo } = appUser;
  const user = getBasiclUserLoginInfo();
  const navigation = useNavigation();
  const selected = useAppSelector(state => state.overlayState.utilitySelected);
  // const haveNotifyBirthday = useAppSelector(state => state.notifyBirthdaySate.haveNotifyBirthday);
  // const countUnreadNotification = useAppSelector(state => state.notificationState.countUnreadNotification);

  const birthdayPress = () => {
    dispatch(setUtilitySelected(appConstants.OVERLAY_MENU.BIRTHDAY));
    navigation.navigate('Overlay' as never);
  };
  const bellPress = () => {
    dispatch(setUtilitySelected(appConstants.OVERLAY_MENU.NOTIFICATION));
    navigation.navigate('Overlay' as never);
  };
  const utilsPress = () => {
    dispatch(setUtilitySelected(appConstants.OVERLAY_MENU.UTILITIES));
    navigation.navigate('Overlay' as never);
  };
  const userInfoPress = () => {
    navigation.navigate('UserInfo' as never);
  };
  const imageGender =
    user?.gender === 'Nam' ? (image.IC_MAN as ImageSourcePropType) : (image.IC_WOMAN as ImageSourcePropType);
  const colorBirthdaySelected =
    selected === appConstants.OVERLAY_MENU.BIRTHDAY ? theme.colors.clearBlue : theme.colors.white;
  const colorBellSelected =
    selected === appConstants.OVERLAY_MENU.NOTIFICATION ? theme.colors.clearBlue : theme.colors.white;
  const colorUtilitySelected =
    selected === appConstants.OVERLAY_MENU.UTILITIES ? theme.colors.clearBlue : theme.colors.white;
  // const imageBirthday = haveNotifyBirthday
  //   ? (image.IC_NEW_BIRTHDAY as ImageSourcePropType)
  //   : (image.IC_BIRTHDAY as ImageSourcePropType);
  return (
    <AppView
      style={[
        styles.userInfoContainer,
        {
          borderLeftColor: theme.colors.borderGrey,
          borderRightColor: theme.colors.borderGrey,
        },
      ]}>
      <AppTouchableOpacity onPress={userInfoPress} style={styles.userContainer}>
        <AppImage source={imageGender} />
        <AppView style={styles.nameContainer}>
          <AppText boldOrLight="bold">{user?.fullName}</AppText>
          <AppText style={styles.userName}>{user?.username}</AppText>
        </AppView>
      </AppTouchableOpacity>
      <AppView style={styles.viewButton}>
        <AppTouchableOpacity
          onPress={birthdayPress}
          style={[styles.utilsButton, { backgroundColor: colorBirthdaySelected }]}>
          {/* <AppImage style={styles.utilsImage} source={imageBirthday} /> */}
        </AppTouchableOpacity>

        <AppView style={styles.paddingView} />
        <AppTouchableOpacity onPress={bellPress} style={[styles.utilsButton, { backgroundColor: colorBellSelected }]}>
          <AppImage style={styles.bellImage} source={image.IC_BELL as ImageSourcePropType} />
          {/* {!!countUnreadNotification && (
            <AppView style={styles.badge}>
              <AppText style={{ color: COLORS.white }}>
                {countUnreadNotification < 10 ? countUnreadNotification : '9+'}
              </AppText>
            </AppView>
          )} */}
        </AppTouchableOpacity>
        <AppView style={styles.paddingView} />
        <AppTouchableOpacity
          onPress={utilsPress}
          style={[styles.utilsButton, { backgroundColor: colorUtilitySelected }]}>
          <AppImage style={styles.utilsImage} source={image.IC_UTILITIES as ImageSourcePropType} />
        </AppTouchableOpacity>
      </AppView>
    </AppView>
  );
};

export default AppUserInfoCard;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.primaryRed,
    height: 18,
    width: 18,
    borderRadius: 9,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: 330,
    height: 70,
    justifyContent: 'space-between',
  },
  logoContainer: {
    height: 70,
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  nameContainer: {
    marginHorizontal: 8,
  },
  utilsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    height: 32,
    width: 32,
  },
  userName: {
    fontSize: 13,
    marginTop: 2,
  },
  utilsImage: {
    width: 30,
    height: 30,
  },
  bellImage: {
    width: 20,
    height: 20,
  },
  userContainer: {
    flexDirection: 'row',
  },
  viewButton: {
    flexDirection: 'row',
  },
  paddingView: {
    width: 6,
  },
});
