import * as React from 'react';
import { useNavigation } from '@react-navigation/core';
import { BackHandler, ImageSourcePropType, SectionList } from 'react-native';
import { useTheme } from 'react-native-paper';
import { checkEmpty, translate } from 'utils';
import { useAppSelector, useEffectOnce, useAppDispatch } from 'app/hooks';

import { AppText, AppView } from 'components';
import styles from 'features/overlay-utilities/style';
import image from 'assets/icons';
import { appConstants } from 'constants/const';
import DrawerItem from 'features/overlay-utilities/components/drawer-item/DrawerItem';
// import ExchangeRate from 'features/exchange-rate';
import AppUserInfoCard from 'components/user-info-card/AppUserInfoCard';
// import NotificationBirthday from 'features/notification-birthday';
// import InterBankRate from 'features/interbank-rate/index';
import { setUtilitySelected } from 'features/overlay-utilities/overlaySlice';
// import NotificationScreen from 'features/notification';

interface IDrawerData {
  screenName: string;
  icon: ImageSourcePropType;
  onPress: () => void | Promise<void>;
}
interface ISectionData {
  title: string;
  data: Array<IDrawerData>;
}

type SectionListData = Array<ISectionData>;

const Overlay: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [index, setIndex] = React.useState<string>('');
  const selected = useAppSelector(state => state.overlayState.utilitySelected);

  const navigateScreen = (screenId: string) => {
    setIndex('');
    navigation.navigate(screenId as never);
  };

  const sectionListData: SectionListData = [
    {
      title: translate('utilities'),
      data: [],
    },
    {
      title: translate('bank'),
      data: [
        {
          screenName: translate('tariff'),
          icon: image.IC_TARIFF as ImageSourcePropType,
          onPress: () => navigateScreen('Tariff'),
        },
        {
          screenName: translate('interest'),
          icon: image.IC_INTEREST as ImageSourcePropType,
          onPress: () => navigateScreen('Interest'),
        },
        {
          screenName: translate('exchange_rate'),
          icon: image.IC_EXCHANGE_RATE as ImageSourcePropType,
          onPress: () => setIndex(translate('exchange_rate')),
        },
        {
          screenName: translate('interbank_rate'),
          icon: image.IC_INTERBANK_RATE as ImageSourcePropType,
          onPress: () => setIndex(translate('interbank_rate')),
        },
      ],
    },
  ];

  const backAction = () => {
    navigateScreen('AppTab');
    dispatch(setUtilitySelected(''));
    return true;
  };

  useEffectOnce(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  });

  const renderItem = (item: IDrawerData) => {
    return <DrawerItem index={index} icon={item.icon} screenName={item.screenName} onPress={item.onPress} />;
  };

  const renderHeader = (title: string) => {
    return (
      <AppView
        style={[
          styles.headerContainer,
          {
            borderBottomColor: theme.colors.borderGrey,
          },
        ]}>
        <AppText boldOrLight="bold" style={{ color: theme.colors.grey }}>
          {title}
        </AppText>
      </AppView>
    );
  };
  return (
    <AppView
      onStartShouldSetResponder={() => {
        if (checkEmpty(index)) {
          navigateScreen('AppTab');
        }
        dispatch(setUtilitySelected(''));
        return true;
      }}
      style={[styles.container, { backgroundColor: theme.colors.black + '20' }]}>
      <AppView
        style={[
          styles.drawerContainer,
          { backgroundColor: theme.colors.white, borderRightColor: theme.colors.borderGrey },
        ]}>
        <AppView style={[styles.userInfoContainer, { borderBottomColor: theme.colors.borderGrey }]}>
          <AppUserInfoCard />
        </AppView>
        {/* {selected === appConstants.OVERLAY_MENU.BIRTHDAY ? (
          <NotificationBirthday />
        ) : selected === appConstants.OVERLAY_MENU.NOTIFICATION ? (
          <NotificationScreen />
        ) : (
          <SectionList
            sections={sectionListData}
            keyExtractor={(item, indexList) => `${String(item)}${String(indexList)}`}
            renderItem={({ item }) => renderItem(item)}
            renderSectionHeader={({ section: { title } }) => renderHeader(title)}
          />
        )} */}
      </AppView>
      {/* {index === translate('exchange_rate') ? (
        <ExchangeRate />
      ) : index === translate('interbank_rate') ? (
        <InterBankRate />
      ) : null} */}
    </AppView>
  );
};

export default React.memo(Overlay);
