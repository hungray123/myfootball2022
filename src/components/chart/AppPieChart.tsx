import React from 'react';
import { PieChart } from 'react-native-charts-wrapper';
import { processColor, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { AppView } from 'components';

interface ChartProps {
  values: any;
  colors: any;
}

const AppPieChart: React.FC<ChartProps> = ({ values, colors }) => {
  const theme = useTheme();

  const data = {
    dataSets: [
      {
        label: '',
        values: values,
        config: {
          colors: colors,
          valueTextSize: 12,
          valueTextColor: processColor(theme.colors.black),
          sliceSpace: 2,
          selectionShift: 10,
          yValuePosition: 'OUTSIDE_SLICE',
          valueFormatter: "#.##'%'",
          valueLineColor: processColor(theme.colors.black),
          valueLinePart1Length: 0.5,
        },
      },
    ],
    config: {
      barWidth: 2,
    },
  };
  const highlights = [{ x: 1 }];
  const description = {
    text: '',
    textSize: 16,
    textColor: processColor(theme.colors.darkYellow),
  };
  const legend = {
    enabled: false,
  };
  const extraOffsets = {
    left: 10,
    top: 5,
    right: 10,
    bottom: 5,
  };
  return (
    <AppView style={style.flexOne}>
      <PieChart
        style={style.flexOne}
        logEnabled={true}
        chartBackgroundColor={processColor(theme.colors.white)}
        chartDescription={description}
        data={data}
        legend={legend}
        highlights={highlights}
        extraOffsets={extraOffsets}
        drawEntryLabels={false}
        accessor="label"
        animation={{ durationY: 1000 }}
        rotationEnabled={true}
        usePercentValues={true}
        maxAngle={450}
        holeRadius={45}
        rotationAngle={35}
        transparentCircleRadius={45}
        centerTextRadiusPercent={100}
        holeColor={processColor(theme.colors.white)}
        transparentCircleColor={processColor(theme.colors.darkGreen)}
      />
    </AppView>
  );
};

const style = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});

export default AppPieChart;
