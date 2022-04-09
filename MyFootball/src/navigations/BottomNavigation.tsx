import {Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Images from 'themes/index';
import {View} from 'react-native';
import Hello from 'components/Hello';
import FindPitch from 'src/screens/football/FindPitch';
import StackNavigationProfile from './StackNavigationProfile';
const Tab = createBottomTabNavigator();
const Navigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarActiveTintColor: '#e91e63'}}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => (
            <TouchableOpacity>
              <Text>
                <IconFontAwesome name="home" size={30} />
              </Text>
            </TouchableOpacity>
          ),
        }}
        // component={FindPitch}
        component={FindPitch}
      />
      <Tab.Screen
        name="Đặt sân"
        options={{
          tabBarIcon: () => (
            <Image
              source={Images.Icon_san_dau}
              style={{width: 30, height: 30}}
            />
          ),
        }}
        // component={Datsan}
        component={View}
      />
      <Tab.Screen
        name="Cửa hàng"
        options={{
          tabBarIcon: () => (
            <TouchableOpacity>
              <Text>
                <IconFontAwesome name="comments-o" size={30} color="blue" />
              </Text>
            </TouchableOpacity>
          ),
        }}
        //component={PitchDropDown}
        component={View}
      />
      <Tab.Screen
        name="Cá nhân"
        options={{
          tabBarIcon: () => (
            <TouchableOpacity>
              <Text>
                <IconFontAwesome name="user" size={30} color="#4B0082" />
              </Text>
            </TouchableOpacity>
          ),
        }}
        //   component={Navigation_Profile}
        component={StackNavigationProfile}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
