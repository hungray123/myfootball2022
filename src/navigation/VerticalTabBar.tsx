import * as React from 'react';
import { StyleSheet, Animated, View, TouchableOpacity, Image, Text, ImageSourcePropType } from 'react-native';
import { useTheme } from 'react-native-paper';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import image from 'assets/icons';

type IProps = React.ComponentProps<typeof BottomTabBar>;

const VerticalTabBar: React.FC<IProps> = ({ state, descriptors, navigation }: IProps) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const theme = useTheme();
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const transformValue = new Animated.Value(0);
  const tabHeight = 62;

  const tabIcon = (key: string): ImageSourcePropType => {
    switch (key) {
      case 'Salekit':
        return image.IC_SALEKIT as ImageSourcePropType;
      case 'Sale':
        return image.IC_SALE as ImageSourcePropType;
      case 'Customer':
        return image.IC_CUSTOMER as ImageSourcePropType;
      case 'Dashboard':
        return image.IC_DASHBOARD as ImageSourcePropType;
      case 'Warning':
        return image.IC_WARNING as ImageSourcePropType;
      case 'SaleManager':
        return image.IC_SALE_MANAGER as ImageSourcePropType;
      case 'PotentialCustomer':
        return image.IC_POTENTIAL_MENU as ImageSourcePropType;
      default:
        return '' as ImageSourcePropType;
    }
  };

  return (
    <Animated.View style={styles.container}>
      <View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;
          const colorIcon = isFocused ? theme.colors.primaryBlue : theme.colors.grey;

          const colorBackground = theme.colors.white;

          const colorSlider = isFocused && route.name !== 'UserInfo' ? theme.colors.primaryBlue : theme.colors.white;

          const onPress = () => {
            if (route.name !== 'UserInfo') {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }
          };
          Animated.spring(transformValue, {
            toValue: index * tabHeight,
            velocity: 0,
            useNativeDriver: true,
          }).start();

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          if (route.name !== 'UserInfo') {
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButtonContainer}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: colorBackground,
                    },
                  ]}>
                  <Image source={tabIcon(route.name)} tintColor={colorIcon} resizeMode="center" />
                  <Text style={[styles.tabTitle, { color: colorIcon }]}>{descriptors[route.key].options.title}</Text>
                </View>
                <Animated.View
                  style={[
                    styles.slider,
                    {
                      backgroundColor: colorSlider,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </Animated.View>
  );
};

export default VerticalTabBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  tabButtonContainer: {
    width: 68,
    height: 62,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 68,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: 2,
  },
  tabTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 10,
    marginBottom: 4,
  },
});
