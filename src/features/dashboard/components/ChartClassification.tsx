import * as React from 'react';
import { AppView, AppText, AppFlatList, AppPieChart } from 'components';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAppSelector } from 'app/hooks';
import { checkNull } from 'utils/Utils';
import { translate, convertString } from 'utils';
import { useCommon } from 'context/AppCommonContext';
import { ChartKeyValue, MapCommonItemChart } from 'app/type';
import { mappingWithComonData, mappingDataChart } from 'features/dashboard/dashboardSlice';
import ItemDescription from 'features/dashboard/components/ItemDescription';
import { appConstants } from 'constants/const';

const ChartClassification: React.FC = () => {
  const { colors } = useTheme();
  const { listCommonByCode } = useCommon();
  const data = useAppSelector(state => state.dashboardState.dataClassifi);
  const listValue = useAppSelector(state => state.dashboardState.dataValueClassifi);
  const commonData = listCommonByCode(appConstants.COMMON_CODE.CUSTOMER_OBJECT) as Array<MapCommonItemChart>;
  const lstDataDesc = mappingWithComonData(listValue, commonData);
  const lstDataChart = mappingDataChart(listValue, commonData)[0];
  const lstColorChart = mappingDataChart(listValue, commonData)[1];

  const renderItem = (item: ChartKeyValue) => {
    return <ItemDescription item={item} />;
  };
  if (checkNull(data)) {
    return (
      <AppView style={style.container}>
        <AppView style={[style.header, { borderBottomColor: colors.borderGrey }]}>
          <AppText boldOrLight={'bold'} style={style.titleStyle}>
            {translate('object_customer_chart')}
          </AppText>
        </AppView>
        <AppView style={style.noDataview}>
          <AppText>{translate('no_data')}</AppText>
        </AppView>
      </AppView>
    );
  }
  return (
    <AppView style={style.container}>
      <AppView style={[style.header, { borderBottomColor: colors.borderGrey }]}>
        <AppText boldOrLight={'bold'} style={style.titleStyle}>
          {data.title}
        </AppText>
      </AppView>
      <AppView style={style.content}>
        <AppPieChart values={lstDataChart} colors={lstColorChart} />
      </AppView>
      <AppView style={style.bottom}>
        <AppFlatList
          data={lstDataDesc}
          keyExtractor={(item, index) => convertString(index)}
          renderItem={({ item }) => renderItem(item as ChartKeyValue)}
        />
      </AppView>
    </AppView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDataview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  titleStyle: {
    fontSize: 16,
    paddingLeft: 12,
  },
  body: {
    flex: 4.5,
  },
  content: {
    height: 340,
    padding: 56,
  },
  bottom: {
    marginTop: 6,
    height: 'auto',
  },
});

export default ChartClassification;
