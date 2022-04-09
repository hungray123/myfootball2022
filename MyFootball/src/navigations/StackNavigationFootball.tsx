import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from 'navigations/BottomNavigation'
import FindPitch from 'screens/football/FindPitch';
import BookFootballPitch from 'src/screens/football/BookFootballPitch';
import DetailsFootball from 'src/screens/football/DetailFootball';
import PaymentScreen from 'src/screens/football/PaymentScreen';

const Stack = createNativeStackNavigator();
const StackNavigationFootball:  React.FC<{navigation:any}>=({navigation})=>{
    return(
       
           <Stack.Navigator  >
                <Stack.Screen name="home" component={BottomNavigation} options={{headerShown: false}}/>
                <Stack.Screen name="home2" component={FindPitch} options={{headerShown: false}}/>
                 {/* có cũng đc và ko có cũng đc FindPitch */}
                <Stack.Screen name="BookFootballPitch"  component={BookFootballPitch} options={{title:"Sân cỏ VH"}} />
                {/* <Stack.Screen name="SingleFootball" component={SingleFootball} options={{headerShown: false}} />  */}
                {/* <Stack.Screen name="Navigation" component={Navigation} /> */}
                <Stack.Screen name="DetailsFootball" component={DetailsFootball}  
                    
                options={{
                        headerShown: false,
                        headerStyle:{
                            backgroundColor:'green'
                        }
                    }

                }
                />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen}
                 options={{
                    headerShown: true,
                    headerStyle:{
                        backgroundColor:'green',
                       
                    },
                    title:"Thanh Toán",
                    headerTintColor: '#fff'
                    
                }

            }
                
                /> 
                {/* <Stack.Screen name="NavigationBack" component={Navigation} /> */}
                {/* <Stack.Screen name="SingleFootball" component={SingleFootball} />  */}
                {/* <Stack.Screen name="TabViewExample" component={TabViewExample} /> */}
            </Stack.Navigator>
      
    )
}
export default StackNavigationFootball;