import { Platform } from 'react-native';

export const MIN_HEIGHT = 1200;
export const HOUR_GUIDE_WIDTH = 100;
export const OVERLAP_OFFSET = Platform.OS === 'web' ? 20 : 10;
export const OVERLAP_PADDING = Platform.OS === 'web' ? 3 : 8;
