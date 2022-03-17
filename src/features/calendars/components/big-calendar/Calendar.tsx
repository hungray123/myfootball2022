import dayjs from 'dayjs';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { CalendarBody } from './CalendarBody';
import { CalendarHeader } from './CalendarHeader';
import { MIN_HEIGHT } from './commonStyles';
import { DateRangeHandler, Event, EventCellStyle, HorizontalDirection, Mode, WeekNum } from './interfaces';
import { filterRenderData, getDatesInNextOneDay, getDatesInNextThreeDays, getDatesInWeek, modeToNum } from './utils';
import _ from 'lodash';
import { CalendarItem } from 'app/type';

interface CalendarProps<T = CalendarItem> {
  events: Event<T>[];
  height: number;
  overlapOffset?: number;
  ampm?: boolean;
  date?: Date | string;
  eventCellStyle?: EventCellStyle<T>;
  locale?: string;
  hideNowIndicator?: boolean;
  mode?: Mode;
  scrollOffsetMinutes?: number;
  showTime?: boolean;
  style?: ViewStyle;
  swipeEnabled?: boolean;
  weekStartsOn?: WeekNum;
  isRTL?: boolean;
  onChangeDate?: DateRangeHandler;
  onPressCell?: (date: Date) => void;
  onPressDateHeader?: (date: Date) => void;
  onPressEvent?: (event: Event<T>) => void;
}

export const Calendar = React.memo(
  ({
    events,
    height,
    ampm = false,
    date,
    eventCellStyle,
    locale = 'vi_VN',
    hideNowIndicator = false,
    mode = 'week',
    overlapOffset,
    scrollOffsetMinutes = 0,
    showTime = true,
    style = {},
    swipeEnabled = true,
    weekStartsOn = 0,
    isRTL = false,
    onChangeDate,
    onPressCell,
    onPressDateHeader,
    onPressEvent,
  }: CalendarProps) => {
    const [targetDate, setTargetDate] = React.useState(dayjs(date));

    React.useEffect(() => {
      if (date) {
        setTargetDate(dayjs(date));
      }
    }, [date]);

    const dayJsConvertedEvents = React.useMemo(
      () =>
        _.map(events, e => ({
          start: _.isNil(e.start) ? dayjs() : dayjs(e.start),
          end: _.isNil(e.end) ? dayjs(e.start) : dayjs(e.end),
          name: e.name,
          id: e.id,
          type: e.type,
          status: e.status,
          level: e.level,
          parentId: e.parentId,
          description: e.description,
          location: e.location,
        })),
      [events],
    );

    const dateRange = React.useMemo(() => {
      switch (mode) {
        case '3days':
          return getDatesInNextThreeDays(targetDate, locale);
        case 'week':
          return getDatesInWeek(targetDate, weekStartsOn, locale);
        case 'day':
          return getDatesInNextOneDay(targetDate, locale);
        default:
          throw new Error('undefined mode');
      }
    }, [mode, targetDate]);

    React.useEffect(() => {
      if (onChangeDate) {
        onChangeDate([dateRange[0].toDate(), dateRange.slice(-1)[0].toDate()]);
      }
    }, [dateRange, onChangeDate]);

    const cellHeight = React.useMemo(() => Math.max(height - 30, MIN_HEIGHT) / 24, [height]);

    const onSwipeHorizontal = React.useCallback(
      (direction: HorizontalDirection) => {
        if (!swipeEnabled) {
          return;
        }
        if ((direction === 'LEFT' && !isRTL) || (direction === 'RIGHT' && isRTL)) {
          setTargetDate(targetDate.add(modeToNum(mode), 'day'));
        } else {
          setTargetDate(targetDate.add(modeToNum(mode) * -1, 'day'));
        }
      },
      [swipeEnabled, targetDate],
    );

    const commonProps = {
      cellHeight,
      dateRange,
      style,
      isRTL,
      mode,
    };

    const dataFiltered = filterRenderData(dayJsConvertedEvents, dateRange);

    return (
      <>
        <CalendarHeader
          {...commonProps}
          // allDayEvents={allDayEvents}
          onPressDateHeader={onPressDateHeader}
        />
        <CalendarBody
          {...commonProps}
          containerHeight={height}
          dayJsConvertedEvents={dataFiltered}
          eventCellStyle={eventCellStyle}
          hideNowIndicator={hideNowIndicator}
          overlapOffset={overlapOffset}
          scrollOffsetMinutes={scrollOffsetMinutes}
          ampm={ampm}
          showTime={showTime}
          onPressCell={onPressCell}
          onPressEvent={onPressEvent}
          onSwipeHorizontal={onSwipeHorizontal}
        />
      </>
    );
  },
);
