import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { OVERLAP_PADDING } from './commonStyles';
import { DayJSConvertedEvent, Mode, WeekNum } from './interfaces';
import _ from 'lodash';

export const DAY_MINUTES = 1440;

export function getDatesInWeek(
  date: Date | dayjs.Dayjs = new Date(),
  weekStartsOn: WeekNum = 0,
  locale = 'en',
): dayjs.Dayjs[] {
  const subject = dayjs(date);
  const subjectDOW = subject.day();
  const days = Array(7)
    .fill(0)
    .map((_, i) => {
      return subject.add(i - subjectDOW + weekStartsOn, 'day').locale(locale);
    });

  return days;
}

export function getDatesInNextThreeDays(date: Date | dayjs.Dayjs = new Date(), locale = 'en'): dayjs.Dayjs[] {
  const subject = dayjs(date).locale(locale);
  const days = Array(3)
    .fill(0)
    .map((_, i) => {
      return subject.add(i, 'day');
    });

  return days;
}

export function getDatesInNextOneDay(date: Date | dayjs.Dayjs = new Date(), locale = 'en'): dayjs.Dayjs[] {
  const subject = dayjs(date).locale(locale);
  const days = Array(1)
    .fill(0)
    .map((_, i) => {
      return subject.add(i, 'day');
    });

  return days;
}

export const hours = Array(24)
  .fill(0)
  .map((_, i) => i);

export function formatHour(hour: number, ampm = false): string {
  if (ampm) {
    if (hour === 0) {
      return '';
    }
    if (hour === 12) {
      return '12 PM';
    }
    if (hour > 12) {
      return `${hour - 12} PM`;
    }
    return `${hour} AM`;
  }
  return `${hour}:00`;
}

export function isToday(date: dayjs.Dayjs): boolean {
  const today = dayjs();
  return today.isSame(date, 'day');
}

export function getRelativeTopInDay(date = dayjs()): number {
  if (date.minute() > 30) {
    return (100 * (date.hour() * 60 + 30)) / DAY_MINUTES;
  } else {
    return (100 * (date.hour() * 60)) / DAY_MINUTES;
  }
}

export function todayInMinutes(): number {
  const today = dayjs();
  return today.diff(dayjs().startOf('day'), 'minute');
}

export function modeToNum(mode: Mode): number {
  switch (mode) {
    case '3days':
      return 3;
    case 'week':
      return 7;
    case 'day':
      return 1;
    default:
      throw new Error('undefined mode');
  }
}

// export function formatStartEnd(event: DayJSConvertedEvent): string {
//     return `${event.start.format('HH:mm')} - ${event.end.format('HH:mm')}`;
// }

export function getOrderOfEvent(event: DayJSConvertedEvent, eventList: DayJSConvertedEvent[]): number {
  dayjs.extend(isBetween);
  const events = eventList
    .filter(
      e =>
        event.start.isBetween(e.start, e.end, 'minute', '[]') ||
        e.start.isBetween(event.start, event.end, 'minute', '[]'),
    )
    .sort((a, b) => {
      if (a.start.isSame(b.start)) {
        return a.diff < b.diff ? -1 : 1;
      } else {
        return a.start.isBefore(b.start) ? -1 : 1;
      }
    });
  return events.indexOf(event);
}

function getColorForEventPosition(event: DayJSConvertedEvent) {
  switch (event.level) {
    case 'HIGH':
      return '#FFD9DC';
    case 'MEDIUM':
      return '#FFE5CE';
    default:
      return '#CDF1DD';
  }
}

export function getStyleForOverlappingEvent(
  eventCount: number,
  eventPosition: number,
  overlapOffset: number,
  event: DayJSConvertedEvent,
): any {
  let overlapStyle = { start: 0, end: 0, zIndex: 100, backgroundColor: getColorForEventPosition(event) };
  if (eventCount > 1) {
    const offset = overlapOffset;
    const start = eventPosition * offset;
    const zIndex = 100 + eventPosition;
    overlapStyle = {
      start: start + OVERLAP_PADDING,
      end: 0,
      zIndex,
      backgroundColor: getColorForEventPosition(event),
    };
  }
  return overlapStyle;
}

export function filterRenderData(event: DayJSConvertedEvent[], dateRange: dayjs.Dayjs[]): _.Dictionary<any[]> {
  console.log(event);
  console.log(dateRange);
  const weekData = _.filter(event, function (o) {
    return (
      dayjs(o.start).isBetween(dateRange[0], dateRange[6], 'day', '[]') ||
      dayjs(o.end).isBetween(dateRange[0], dateRange[6], 'day', '[]')
    );
  });
  const dataGroup = groupData(weekData, dateRange);

  return dataGroup;
}

export function breakData(listData: DayJSConvertedEvent[], date: dayjs.Dayjs): DayJSConvertedEvent[] {
  const inDayData = listData
    .filter(({ start }) => dayjs(start).isBetween(date.startOf('day'), date.endOf('day'), null, '[)'))
    .map(event => ({
      ...event,
      dateEvent: date.format('DD/MM/YYYY'),
      diff: 100 * (1 / DAY_MINUTES) * event.end.diff(event.start, 'minute'),
    }));
  const beforeDayData = listData
    .filter(
      ({ start, end }) =>
        dayjs(start).isBefore(date.startOf('day')) &&
        dayjs(end).isBetween(date.startOf('day'), date.endOf('day'), null, '[)'),
    )
    .map(event => ({
      ...event,
      start: dayjs(event.end).startOf('day'),
      dateEvent: date.format('DD/MM/YYYY'),
      diff: 100 * (1 / DAY_MINUTES) * event.end.diff(dayjs(event.end).startOf('day'), 'minute'),
    }));
  const afterData = listData
    .filter(({ start, end }) => dayjs(start).isBefore(date.startOf('day')) && dayjs(end).isAfter(date.endOf('day')))
    .map(event => ({
      ...event,
      start: dayjs(event.end).startOf('day'),
      end: dayjs(event.end).endOf('day'),
      dateEvent: date.format('DD/MM/YYYY'),
      diff: 100 * (1 / DAY_MINUTES) * dayjs(event.end).endOf('day').diff(dayjs(event.end).startOf('day'), 'minute'),
    }));

  const allWeekData = _.orderBy([...inDayData, ...beforeDayData, ...afterData], ['diff'], ['desc']);

  return allWeekData;
}

export function groupData(event: DayJSConvertedEvent[], dateRange: dayjs.Dayjs[]) {
  let listEvent: any[] = [];
  _.forEach(dateRange, function (date) {
    const dataByDate = breakData(event, date);
    listEvent = _.concat(listEvent, dataByDate);
  });
  const groupData = _.groupBy(listEvent, 'dateEvent');
  return groupData;
}
