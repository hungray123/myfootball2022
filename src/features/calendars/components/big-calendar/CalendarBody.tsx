import { bigCalendarStyle } from './styles';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import * as React from 'react';
import {
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { CalendarEvent } from './CalendarEvent';
import { DayJSConvertedEvent, Event, EventCellStyle, HorizontalDirection } from './interfaces';
import { formatHour, hours, getOrderOfEvent } from './utils';
import _ from 'lodash';

dayjs.extend(isBetween);
const SWIPE_THRESHOLD = 50;

interface CalendarBodyProps<T> {
  cellHeight: number;
  containerHeight: number;
  dateRange: dayjs.Dayjs[];
  dayJsConvertedEvents: _.Dictionary<any[]>;
  scrollOffsetMinutes: number;
  ampm: boolean;
  showTime: boolean;
  style: ViewStyle;
  eventCellStyle?: EventCellStyle<T>;
  hideNowIndicator?: boolean;
  overlapOffset?: number;
  isRTL: boolean;
  onPressCell?: (date: Date) => void;
  onPressEvent?: (event: Event<T>) => void;
  onSwipeHorizontal?: (d: HorizontalDirection) => void;
}

interface WithCellHeight {
  cellHeight: number;
}

const HourGuideColumn = React.memo(
  ({ cellHeight, hour, ampm }: WithCellHeight & { hour: number; ampm: boolean }) => (
    <View style={[bigCalendarStyle.dateCell, { height: cellHeight, alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={bigCalendarStyle.guideText}>{formatHour(hour, ampm)}</Text>
    </View>
  ),
  () => true,
);

interface HourCellProps extends WithCellHeight {
  onPress: (d: dayjs.Dayjs) => void;
  date: dayjs.Dayjs;
  hour: number;
}

function HourCell({ cellHeight, onPress, date, hour }: HourCellProps) {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(date.hour(hour).minute(0))}>
      <View style={[bigCalendarStyle.dateCell, { height: cellHeight }]} />
    </TouchableWithoutFeedback>
  );
}

export const CalendarBody = React.memo(
  ({
    containerHeight,
    cellHeight,
    dateRange,
    style = {},
    onPressCell,
    dayJsConvertedEvents,
    ampm,
    showTime,
    scrollOffsetMinutes,
    onSwipeHorizontal,
    overlapOffset,
    isRTL,
    onPressEvent,
  }: CalendarBodyProps<any>) => {
    const scrollView = React.useRef<ScrollView>(null);
    const [now, setNow] = React.useState(dayjs());
    const [panHandled, setPanHandled] = React.useState(false);

    React.useEffect(() => {
      if (scrollView.current && scrollOffsetMinutes) {
        // We add delay here to work correct on React Native
        // see: https://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working
        setTimeout(
          () => {
            scrollView.current!.scrollTo({
              y: (cellHeight * scrollOffsetMinutes) / 60,
              animated: false,
            });
          },
          Platform.OS === 'web' ? 0 : 10,
        );
      }
    }, [scrollView.current]);

    React.useEffect(() => {
      const pid = setInterval(() => setNow(dayjs()), 2 * 60 * 1000);
      return () => clearInterval(pid);
    }, []);

    const panResponder = React.useMemo(
      () =>
        PanResponder.create({
          // see https://stackoverflow.com/questions/47568850/touchableopacity-with-parent-panresponder
          onMoveShouldSetPanResponder: (_, { dx, dy }) => {
            return dx > 2 || dx < -2 || dy > 2 || dy < -2;
          },
          onPanResponderMove: (_, { dy, dx }) => {
            if (dy < -1 * SWIPE_THRESHOLD || SWIPE_THRESHOLD < dy || panHandled) {
              return;
            }
            if (dx < -1 * SWIPE_THRESHOLD) {
              onSwipeHorizontal && onSwipeHorizontal('LEFT');
              setPanHandled(true);
              return;
            }
            if (dx > SWIPE_THRESHOLD) {
              onSwipeHorizontal && onSwipeHorizontal('RIGHT');
              setPanHandled(true);
              return;
            }
          },
          onPanResponderEnd: () => {
            setPanHandled(false);
          },
        }),
      [panHandled, onSwipeHorizontal],
    );

    const _onPressCell = React.useCallback(
      (date: dayjs.Dayjs) => {
        onPressCell && onPressCell(date.toDate());
      },
      [onPressCell],
    );

    const _renderMappedEvent = (event: DayJSConvertedEvent, date: dayjs.Dayjs, index: number) => {
      const eventOrder = getOrderOfEvent(event, dayJsConvertedEvents[date.format('DD/MM/YYYY')]);
      return (
        <CalendarEvent
          key={`${index}`}
          event={event}
          showTime={showTime}
          eventCount={index}
          eventOrder={eventOrder}
          overlapOffset={overlapOffset}
          onPressEvent={onPressEvent}
        />
      );
    };

    return (
      <ScrollView
        style={[
          {
            height: containerHeight - cellHeight * 3,
          },
          style,
        ]}
        ref={scrollView}
        nestedScrollEnabled={true}
        scrollEventThrottle={32}
        {...(Platform.OS !== 'web' ? panResponder.panHandlers : {})}
        showsVerticalScrollIndicator={false}>
        <View
          style={isRTL ? [styles.bodyRTL] : [styles.body]}
          {...(Platform.OS === 'web' ? panResponder.panHandlers : {})}>
          <View style={[bigCalendarStyle.hourGuide]}>
            {hours.map(hour => (
              <HourGuideColumn key={hour} cellHeight={cellHeight} hour={hour} ampm={ampm} />
            ))}
          </View>
          {dateRange.map(date => {
            const renderData = dayJsConvertedEvents[date.format('DD/MM/YYYY')];
            return (
              <View style={styles.dayContainer} key={date.toString()}>
                {hours.map(hour => (
                  <HourCell key={hour} cellHeight={cellHeight} date={date} hour={hour} onPress={_onPressCell} />
                ))}
                {_.isNil(renderData) ? null : renderData.map((item, index) => _renderMappedEvent(item, date, index))}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  bodyRTL: {
    flexDirection: 'row-reverse',
    flex: 1,
  },
  nowIndicator: {
    position: 'absolute',
    zIndex: 10000,
    backgroundColor: 'red',
    height: 2,
    width: '100%',
  },
  dayContainer: {
    flex: 1,
    overflow: 'hidden',
  },
});
