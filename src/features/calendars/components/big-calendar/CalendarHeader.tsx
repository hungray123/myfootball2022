import dayjs from 'dayjs';
import * as React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Event } from './interfaces';
import { bigCalendarStyle } from './styles';
import { isToday } from './utils';

interface CalendarHeaderProps<T> {
  dateRange: dayjs.Dayjs[];
  cellHeight: number;
  style: ViewStyle;
  // allDayEvents: Event<T>[]
  isRTL: boolean;
  mode: string;
  onPressDateHeader?: (date: Date) => void;
}

export const CalendarHeader = React.memo(
  ({ dateRange, style = {}, isRTL, onPressDateHeader, mode }: CalendarHeaderProps<any>) => {
    const _onPress = React.useCallback(
      (date: Date) => {
        onPressDateHeader && onPressDateHeader(date);
      },
      [onPressDateHeader],
    );

    return (
      <View style={[isRTL ? bigCalendarStyle.containerRTL : bigCalendarStyle.container, style]}>
        <View style={[bigCalendarStyle.hourGuide, bigCalendarStyle.hourGuideSpacer]} />
        {dateRange.map(date => {
          const _isToday = isToday(date);
          return (
            <TouchableOpacity
              style={{ flex: 1, padding: 8 }}
              onPress={() => _onPress(date.toDate())}
              disabled={onPressDateHeader === undefined}
              key={date.toString()}>
              <View style={[bigCalendarStyle.headerItemWrapper, { backgroundColor: _isToday ? '#EFF2FE40' : 'white' }]}>
                <Text style={[bigCalendarStyle.guideText, _isToday && { color: '#FF808B' }]}>{date.format('ddd')}</Text>
                <Text style={[bigCalendarStyle.dateText, _isToday && { color: '#FF808B' }]}>
                  {mode === 'day' ? date.format('DD-MM-YYYY') : date.format('D')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },
);
