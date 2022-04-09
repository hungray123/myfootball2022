import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from 'screens/user/Profile';
import ChangePassword from 'src/screens/user/ChangePassword';
import EditProfile from 'src/screens/user/EditProfile';
import EditScreen from 'src/components/EditScreen';
import PitchDropDown from 'src/screens/football/PitchDropDown';

const Stack = createNativeStackNavigator();

const StackNavigationProfile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
      {/* <Stack.Screen name="PitchDropDown" component={PitchDropDown} /> */}
      {/* <Stack.Screen name="SingleFootball" component={SingleFootball} options={{headerShown: false}} />  */}
      {/* <Stack.Screen name="Navigation" component={Navigation} /> */}
      {/* <Stack.Screen name="DetailsFootball" component={DetailsFootball}  options={{headerShown: false}}/> */}
      {/* <Stack.Screen name="SingleFootballBB" component={SingleFootball} />  */}
      {/* <Stack.Screen name="NavigationBack" component={Navigation} /> */}
      {/* <Stack.Screen name="SingleFootball" component={SingleFootball} />  */}
      {/* <Stack.Screen name="TabViewExample" component={TabViewExample} /> */}
    </Stack.Navigator>
  );
};
export default StackNavigationProfile;
