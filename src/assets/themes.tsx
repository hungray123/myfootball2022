/* eslint-disable prettier/prettier */
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import merge from 'deepmerge';

/**
 * Dùng để mô tả theme cho project. Nếu muốn thêm theme thì khởi tạo 1 themes mới như CustomDefaultTheme và thêm vào THEME_NAME và mapThemesWithNames
 */

declare global {
  namespace ReactNativePaper {
    interface ThemeFonts {
      superLight: ThemeFont;
      bold: ThemeFont;
    }
    interface ThemeColors {
      customColor: string;
      grey: string;
      lightGrey: string;
      darkRed: string;
      darkGreen: string;
      darkYellow: string;
      primaryBlue: string;
      lightBlue: string;
      lightRed: string;
      lightYellow: string;
      lightGreen: string;
      white: string;
      black: string;
      borderGrey: string;
      clearBlue: string;
      purple: string;
      rowBlue: string;
      //Thêm 2 màu cho thằng navigation
      card: string;
      border: string;
      whisper: string;
      jordyBlue: string;
      seashellPeach: string;
      texasRose: string;
      clearBlue50: string;
      coralRed: string;
      red: string;
    }
    interface ThemeAnimation {
      customProperty: number;
    }
    interface Theme {
      userDefinedThemeProperty: string;
    }
  }
}

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const CustomDarkTheme: ReactNativePaper.Theme = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    customColor: '#BADA55',
    grey: '#86868F',
    lightGrey: '#D8D8D8',
    primaryBlue: '#5E81F4',
    lightBlue: '#BFCDFB',
    darkRed: '#FF808B',
    darkGreen: '#58CF8D',
    darkYellow: '#F4BE5E',
    lightRed: '#FFD9DC',
    lightYellow: '#FFE5CE',
    lightGreen: '#CDF1DD',
    white: '#FFFFFF',
    black: '#000000',
    borderGrey: '#EBEBEC',
    clearBlue: '#EFF2FE',
    whisper: '#F5F5FA',
    purple: '#B4A0FA',
    jordyBlue: '#9EB3F8',
    seashellPeach: '#FFF6EF',
    texasRose: '#FFA95A',
    clearBlue50: '#EFF2FE50',
    rowBlue: '#F9FAFF',
    coralRed: '#FF3446',
    red: '#FF0000',
  },
  fonts: {
    ...CombinedDarkTheme.fonts,
    superLight: {...CombinedDarkTheme.fonts.light},
    regular: {
      fontFamily: 'Lato-Regular',
    },
    light: {
      fontFamily: 'Lato-Light',
      // fontWeight: '300',
    },
    bold: {
      fontFamily: 'Lato-Bold',
      // fontWeight: '700',
    },
  },
  userDefinedThemeProperty: '',
  animation: {
    ...CombinedDarkTheme.animation,
    customProperty: 1,
  },
};

export const CustomDefaultTheme = {
  ...CombinedDefaultTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    customColor: '#BADA55',
    grey: '#86868F',
    lightGrey: '#D8D8D8',
    primaryBlue: '#5E81F4',
    lightBlue: '#BFCDFB',
    darkRed: '#FF808B',
    darkGreen: '#58CF8D',
    darkYellow: '#F4BE5E',
    lightRed: '#FFD9DC',
    lightYellow: '#FFE5CE',
    lightGreen: '#CDF1DD',
    white: '#FFFFFF',
    black: '#000000',
    borderGrey: '#EBEBEC',
    clearBlue: '#EFF2FE',
    whisper: '#F5F5FA',
    purple: '#B4A0FA',
    jordyBlue: '#9EB3F8',
    seashellPeach: '#FFF6EF',
    texasRose: '#FFA95A',
    clearBlue50: '#EFF2FE50',
    rowBlue: '#F9FAFF',
    coralRed: '#FF3446',
    red: '#FF0000',
  },
  fonts: {
    ...CombinedDefaultTheme.fonts,
    superLight: {...CombinedDefaultTheme.fonts.light},
    regular: {
      fontFamily: 'Lato-Regular',
    },
    light: {
      fontFamily: 'Lato-Light',
      // fontWeight: '300',
    },
    bold: {
      fontFamily: 'Lato-Bold',
      // fontWeight: '',
    },
  },
  userDefinedThemeProperty: '',
  animation: {
    ...CombinedDefaultTheme.animation,
    customProperty: 1,
  },
};
export const THEME_NAME = {
  DARK_THEME: 'DARK_THEME',
  DEFAULT_THEME: 'DEFAULT_THEME',
};

const mapThemesWithNames = {
  [THEME_NAME.DARK_THEME]: CustomDarkTheme,
  [THEME_NAME.DEFAULT_THEME]: CustomDefaultTheme,
};

export const getThemeFromName = (themeName: string): ReactNativePaper.Theme => {
  const theme: ReactNativePaper.Theme = mapThemesWithNames[themeName];
  return theme ? theme : CustomDefaultTheme;
};
