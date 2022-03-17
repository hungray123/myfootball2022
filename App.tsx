/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getItem, setItem } from 'utils/AsyncStorageHelper';
import { IAppPreference, IAppPreferenceContext } from 'app/type';
import { PreferencesContext } from 'app/Context';
import { config } from './src/constants/config';
import { handleException, setI18nConfig } from 'utils';
import { AppDialogProvider } from 'components/dialog/AppDialogContext';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { AppFontAwesomeIcon } from 'components';
import Toast from 'react-native-toast-message';
import { AppUserProvider } from 'context/AppUserContext';
import { navigationContainerRef } from 'utils';
import { AppCommonProvider } from 'context/AppCommonContext';
import { MenuProvider } from 'react-native-popup-menu';
import { appConstants } from 'constants/const';
import { getThemeFromName, THEME_NAME } from './src/assets/themes';
import RootStackNavigation from 'navigation/RootStackNavigation';

const App = () => {
  /**
   * Dùng để set theme cho toàn App
   */
  const [themeName, setThemeName] = React.useState<string>(THEME_NAME.DEFAULT_THEME);
  /**
   * Dùng để set localize cho toàn App
   */
  const [languageCode, setLanguageCode] = React.useState<string>(config.DEFAULT_LANGUAGE);

  const changeLanguageCode = (code: string): void => {
    setLanguageCode(code);
    setI18nConfig(code);
  };

  const theme = getThemeFromName(themeName);
  const navigationTheme: Theme = {
    ...theme,
    colors: {
      ...theme.colors,
    },
  };
  //Xử lý khi thằng themeName thay đổi
  React.useEffect(() => {
    //xử lý lưu preference của App khi thông tin thay đổi
    const saveAppPreps: () => Promise<void> = async () => {
      try {
        //Lưu hết các cấu hình của app trong key này
        const prefString = JSON.stringify({
          themeName: themeName,
          languageCode: languageCode,
        });
        console.log(prefString, 'prefString');
        await setItem(appConstants.ASYNC_STORAGE_KEY.PREFERENCES_KEY, prefString);
      } catch (error) {
        console.log('Lưu cấu hình app Thất bại, error', error);
      }
    };
    saveAppPreps()
      .then(() => {
        //Không xử lý
      })
      .catch(e => {
        //Không xử lý
      });
  }, [themeName, languageCode]);

  React.useEffect(() => {
    //xử lý restore preference của App
    const restoreAppPrefs: () => Promise<void> = async (): Promise<void> => {
      try {
        const prefString = await getItem(appConstants.ASYNC_STORAGE_KEY.PREFERENCES_KEY);

        const preferences: IAppPreference = JSON.parse(prefString || '');
        if (preferences) {
          setThemeName(preferences.themeName);
          changeLanguageCode(preferences.languageCode);
        }
      } catch (error) {
        // ignore error
        handleException(error);
      }
    };
    restoreAppPrefs()
      .then(() => {
        //Không xử lý
      })
      .catch(e => {
        //Không xử lý
        handleException(e);
      });
  }, []);

  const preferences = React.useMemo<IAppPreferenceContext>(() => {
    return {
      themeName: themeName,
      changeTheme: name => {
        setThemeName(name);
      },
      languageCode: languageCode,
      changeLanguageCode: code => {
        changeLanguageCode(code);
      },
    };
  }, [themeName, languageCode]);

  const toastConfig = {
    success_create: ({ text1, props, ...rest }) => (
      <View
        style={[
          styles.toastContainer,
          {
            backgroundColor: theme.colors.lightBlue,
          },
        ]}>
        <AppFontAwesomeIcon color={theme.colors.black} name="check-circle" size={25} />
        <Text style={[styles.toastText]}>{text1}</Text>
      </View>
    ),
  };

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <MenuProvider style={styles.flex1}>
          <SafeAreaProvider>
            <PreferencesContext.Provider value={preferences}>
              <NavigationContainer theme={navigationTheme} ref={navigationContainerRef}>
                <AppDialogProvider>
                  <AppCommonProvider>
                    <AppUserProvider>
                      <RootStackNavigation />
                    </AppUserProvider>
                  </AppCommonProvider>
                </AppDialogProvider>
              </NavigationContainer>
              <Toast config={toastConfig} />
            </PreferencesContext.Provider>
          </SafeAreaProvider>
        </MenuProvider>
      </Provider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  flex1: { flex: 1 },
  toastContainer: {
    height: 50,
    width: '35%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  toastText: {
    fontSize: 20,
    marginLeft: 16,
  },
});

export default App;
