import { Platform, StyleSheet } from 'react-native';

export const MIN_HEIGHT = 1200;
export const HOUR_GUIDE_WIDTH = 100;
export const OVERLAP_OFFSET = Platform.OS === 'web' ? 20 : 8;
export const OVERLAP_PADDING = Platform.OS === 'web' ? 3 : 0;

export const bigCalendarStyle = StyleSheet.create({
  dateCell: {
    borderWidth: 1,
    borderColor: '#EBEBEC',
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  guideText: {
    fontFamily: 'Lato-Regular',
    color: '#353644',
    fontSize: 14,
    textAlign: 'center',
  },
  hourGuide: {
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    width: HOUR_GUIDE_WIDTH,
  },
  eventCell: {
    borderWidth: 0.5,
    borderColor: '#86868F',
    position: 'absolute',
    backgroundColor: '#5E81F4',
    zIndex: 100,
    start: 3,
    end: 3,
    borderRadius: 4,
    padding: 4,
    overflow: 'hidden',
    minWidth: '33%',
  },
  eventTitle: {
    fontFamily: 'Lato-Regular',
    color: '#353644',
    fontSize: 12,
  },
  eventComplete: {
    fontFamily: 'Lato-Regular',
    color: '#353644',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  container: {
    flexDirection: 'row',
    borderBottomColor: '#EBEBEC',
    borderBottomWidth: 1,
  },
  containerRTL: {
    flexDirection: 'row-reverse',
    borderBottomColor: '#EBEBEC',
    borderBottomWidth: 1,
  },
  dateText: {
    fontFamily: 'Lato-Regular',
    color: '#353644',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 6,
  },
  hourGuideSpacer: {
    borderBottomColor: '#EBEBEC',
    borderBottomWidth: 1,
  },
  headerItemWrapper: {
    justifyContent: 'center',
    padding: 8,
    borderRadius: 4,
  },
});
