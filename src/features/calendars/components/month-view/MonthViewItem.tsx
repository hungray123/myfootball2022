import { AppFontAwesomeIcon, AppText, AppTouchableOpacity, AppView } from 'components';
import * as React from 'react';
import styles from 'features/calendars/style';
import { CalendarDot, DateObject, MultiDotMarking } from 'react-native-calendars';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setChosenDate } from 'features/calendars/calendarsSlice';
import { checkNull } from 'utils';

interface IMonthViewItem {
  state: string;
  date: DateObject;
  marking: MultiDotMarking;
  pressDay: () => void;
}
const MonthViewItem: React.FC<IMonthViewItem> = (props: IMonthViewItem) => {
  const dispatch = useDispatch();
  const color = props.state === 'today' ? 'red' : props.state === 'disabled' ? 'gray' : 'black';
  const backgroundColor = props.state === 'today' ? '#EFF2FE' : 'white';
  const renderDots = () => {
    if (!checkNull(props.marking) && !checkNull(props.marking.dots)) {
      return props.marking.dots.map((item: CalendarDot) => (
        <View key={item.key}>
          <AppFontAwesomeIcon name="circle" color={item.color} size={8} style={styles.dotItem} />
        </View>
      ));
    } else {
      return null;
    }
  };
  return (
    <AppTouchableOpacity
      onPress={() => {
        props.pressDay();
        dispatch(setChosenDate(props.date.dateString));
      }}
      style={[
        styles.monthItemContainer,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      <View style={styles.monthItemTextContainer}>
        <AppText
          style={[
            styles.monthItemText,
            {
              color: color,
            },
          ]}>
          {props.date.day}
        </AppText>
      </View>
      <AppView style={styles.dotsContainer}>{renderDots()}</AppView>
    </AppTouchableOpacity>
  );
};

export default MonthViewItem;
