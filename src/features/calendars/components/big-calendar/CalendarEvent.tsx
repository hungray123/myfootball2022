import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { OVERLAP_OFFSET } from './commonStyles';
import { DayJSConvertedEvent } from './interfaces';
import { getRelativeTopInDay, getStyleForOverlappingEvent } from './utils';
import { bigCalendarStyle } from './styles';

function getEventCellPositionStyle(event: DayJSConvertedEvent) {
  const relativeHeight = event.diff;
  const relativeTop = getRelativeTopInDay(event.start);
  return {
    height: `${relativeHeight}%`,
    top: `${relativeTop}%`,
  };
}

interface CalendarBodyProps<T> {
  event: DayJSConvertedEvent;
  showTime: boolean;
  eventCount?: number;
  eventOrder?: number;
  overlapOffset?: number;
  onPressEvent: (event: DayJSConvertedEvent) => void;
}

export const CalendarEvent = React.memo(
  ({
    event,
    showTime,
    eventCount = 1,
    eventOrder = 0,
    overlapOffset = OVERLAP_OFFSET,
    onPressEvent,
  }: CalendarBodyProps<any>) => {
    const statusStyle = event.status === 'DONE' ? bigCalendarStyle.eventComplete : bigCalendarStyle.eventTitle;
    return (
      <TouchableOpacity
        delayPressIn={20}
        key={event.start.toString()}
        style={[
          bigCalendarStyle.eventCell,
          getEventCellPositionStyle(event),
          getStyleForOverlappingEvent(eventCount, eventOrder, overlapOffset, event),
          { minHeight: 35 },
        ]}
        onPress={() => onPressEvent(event)}>
        {event.end.diff(event.start, 'minute') < 32 && showTime ? (
          <Text style={statusStyle}>
            {event.name},<Text style={statusStyle}>{event.start.format('HH:mm')}</Text>
          </Text>
        ) : (
          <>
            <Text style={statusStyle}>{event.name}</Text>
            {showTime && (
              <Text style={statusStyle}>
                {event.start.format('HH:mm')} - {event.end.format('HH:mm')}
              </Text>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  },
);
