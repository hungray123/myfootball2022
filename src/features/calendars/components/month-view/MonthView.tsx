import { AppMaterialIcon, AppText, AppView } from 'components';
import * as React from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';
import { appConstants } from 'constants/const';
import MonthViewItem from './MonthViewItem';
import styles from 'features/calendars/style';
import { useTheme } from 'react-native-paper';
import { formatDateTime } from 'utils';
import { useAppSelector } from 'app/hooks';
import { CalendarItem } from 'app/type';

interface IMonthView {
  onPressDate: () => void;
}

const MonthView: React.FC<IMonthView> = (props: IMonthView) => {
  const theme = useTheme();
  const calendarData: Array<CalendarItem> = useAppSelector(state => state.calendarState.displayData);
  const result = _(calendarData)
    .groupBy(v => moment(v.start).format(appConstants.FORMAT_DATE_TIME.YYYY_MM_DD))
    .mapValues(v => {
      const data = _.map(v, function (o) {
        switch (o.level) {
          case appConstants.PRIORITY.HIGH:
            return { key: 'HIGH', color: theme.colors.darkRed };
          case appConstants.PRIORITY.MEDIUM:
            return { key: 'MEDIUM', color: theme.colors.darkYellow };
          case appConstants.PRIORITY.LOW:
            return { key: 'LOW', color: theme.colors.darkGreen };
          default:
            return { key: 'LOW', color: theme.colors.darkGreen };
        }
      });
      const drop = data.length > 5 ? _.dropRight(data, data.length - 5) : data;
      return { dots: drop };
    })
    .value();

  const customHeader = (date: Date) => {
    const displayDate: string = formatDateTime(date.toString(), appConstants.FORMAT_DATE_TIME.MM_YYYY);
    return (
      <AppView style={styles.monthHeaderContainer}>
        <AppText style={styles.monthHeaderTitle}>{displayDate}</AppText>
      </AppView>
    );
  };

  return (
    <Calendar
      style={styles.monthViewContainer}
      markedDates={result}
      markingType={'multi-dot'}
      renderArrow={direction => (
        <AppMaterialIcon name={direction === 'left' ? 'chevron-left' : 'chevron-right'} color="red" size={15} />
      )}
      renderHeader={date => customHeader(date)}
      dayComponent={({ state, date, marking }) => {
        return <MonthViewItem pressDay={() => props.onPressDate()} state={state} date={date} marking={marking} />;
      }}
    />
  );
};

export default MonthView;
