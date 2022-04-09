import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from 'screens/user/Profile';

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {useEffect, useMemo, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {createStore} from 'redux';
import {ApplicationState} from 'src/redux';
import SplashScreen from 'src/screens/login/SplashScreen';
import StackNavigationFootball from './StackNavigationFootball';
import LoginTabs from 'screens/login/LoginTabs';

const Stack = createNativeStackNavigator();
const RootStackNavigation = () => {
  //const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const {token, isLoading, isAdmin} = useSelector(
    (state: ApplicationState) => state.userReducer,
  );

  useEffect(() => {
    setTimeout(async () => {
      let _token;
      let _role;
      try {
        _token = await AsyncStorage.getItem('token');
        _role = await AsyncStorage.getItem('role');
        // console.log(_token);
        // console.log("tokenAPP: " + _token);
        dispatch({type: 'RETRIEVE_TOKEN', payload: _token, role: _role});
        // dispatch({ type: "RETRIEVE_ROLE", payload: _role });
        // console.log("tokenAPP222222222: " + _token);
      } catch (error) {
        console.log(error);
      }
    }, 100);
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  console.log('admin là gì ' + isAdmin);
  return (
    <NavigationContainer>
      {console.log('gg====' + token)}
      {token == null || undefined ? (
        <Stack.Navigator>
          <Stack.Screen
            name="hi"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginHome"
            component={LoginTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : isAdmin == '0' ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Navigation"
            component={StackNavigationFootball}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Navigation"
            component={Profile}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RootStackNavigation;
