import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { StatusBar, useColorScheme, SafeAreaView } from 'react-native';
import Login from 'features/login';
import AppTabNavigation, { AppTabParamList } from './AppTabNavigation';
import Dialog from 'features/dialog';
import CreateCalendar from 'features/create-calendar';
import UpdateCalendar from 'features/update-calendar';
import TodoListEvent from 'features/todolist-event';
import TodoUpdate from 'features/todolist-event-update';
import { useAppUser } from 'context/AppUserContext';

export type RootStackParamList = {
  Login: undefined;
  AppTab: NavigatorScreenParams<AppTabParamList>; //Lấy params trong screen da khai bao tai apptabparams
  Dialog: undefined;
  UpdateTodo: undefined;
  CreateTodoEvent: undefined;
  UpdateCalendar: undefined;
  CreateCalendar: undefined;
  Tariff: undefined;
  Overlay: undefined;
  Interest: undefined;
  CustomerDetail: undefined;
  SearchAccount: undefined;
  SaleFlow: undefined;
  ModalPickAddress: undefined;
  ModalPickIndustry: undefined;
  SaleOpportunityDetail: undefined;
  SaleOpportunityAdd: undefined;
  ServiceProductDetail: undefined;
  PotentialCustomerCreate: undefined;
  AddRole: undefined;
  CameraDetectPaper: undefined;
  CreateSign: undefined;
  PotentialCustomerDetail: undefined;
  InsuranceSalesHub: undefined;
  TargetDetail: undefined;
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  } as unknown;
  const { getDetailUserLoginInfo, resetTimeOut } = useAppUser();
  const detailUserInfo = getDetailUserLoginInfo();

  /**options Show Screen cho thằng App Tab */
  const groupStackAppTabScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    presentation: 'transparentModal',
  };

  return (
    <SafeAreaView
      style={backgroundStyle}
      onStartShouldSetResponderCapture={() => {
        resetTimeOut();
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {detailUserInfo ? (
        <RootStack.Navigator>
          <RootStack.Group screenOptions={() => groupStackAppTabScreenOptions}>
            <RootStack.Screen name="AppTab" component={AppTabNavigation} />
            <RootStack.Screen name="CreateCalendar" component={CreateCalendar} />
            <RootStack.Screen name="UpdateCalendar" component={UpdateCalendar} />
            <RootStack.Screen name="CreateTodoEvent" component={TodoListEvent} />
            <RootStack.Screen name="UpdateTodo" component={TodoUpdate} />
          </RootStack.Group>
          <RootStack.Group screenOptions={() => groupStackAppTabScreenOptions}>
            <RootStack.Screen name="Dialog" component={Dialog} />
          </RootStack.Group>
        </RootStack.Navigator>
      ) : (
        <RootStack.Navigator>
          <RootStack.Group screenOptions={() => groupStackAppTabScreenOptions}>
            <RootStack.Screen name="Login" component={Login} />
          </RootStack.Group>
        </RootStack.Navigator>
      )}
    </SafeAreaView>
  );
};

export default RootStackNavigation;
