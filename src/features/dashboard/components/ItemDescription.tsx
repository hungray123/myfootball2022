import * as React from 'react';
import { AppView, AppText } from 'components';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ChartKeyValue } from 'app/type';

interface IProps {
  item: ChartKeyValue;
}

const ItemDescription: React.FC<IProps> = ({ item }) => {
  const { colors } = useTheme();

  return (
    <AppView style={style.container}>
      <AppView style={[style.cyrcleColor, { backgroundColor: item?.color }]} />
      <AppView style={[style.textView, { borderBottomColor: colors.borderGrey }]}>
        <AppText style={style.nameValue}>{item?.label}</AppText>
        <AppText boldOrLight={'bold'}>{item?.value} kh</AppText>
      </AppView>
    </AppView>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: 16,
    paddingRight: 16,
  },
  cyrcleColor: {
    height: 16,
    width: 16,
    marginBottom: 2,
    borderRadius: 16,
  },
  textView: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    borderBottomWidth: 1,
  },
  nameValue: {
    marginBottom: 2,
  },
});

export default ItemDescription;
