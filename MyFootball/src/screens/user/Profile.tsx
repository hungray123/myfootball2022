import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Images from 'src/themes';
import { UserLogout } from 'src/redux';
import { BASE_URL } from 'src/utils';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert } from 'react-native';

interface Props {
  navigation: any;
}
const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Profile: React.FC<Props> = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [uu, setUu] = useState('');
  const dispatch = useDispatch();
  //const {user,error} =useSelector((state:ApplicationState)=>state.userReducer);
  // const {token,username,id}=user;
  useEffect(() => {
    let a;
    setTimeout(async () => {
      try {
        a = await AsyncStorage.getItem('token');
        //console.log("get In4 from Api: " + a);
        var axios = require('axios');
        //const {token,username,id}=user;
        //let aaa:string=AsyncStorage.getItem('token');
        var config = {
          method: 'get',
          url: `${BASE_URL}users/me`,
          headers: {
            Authorization: 'Bearer ' + a,
          },
        };

        axios(config)
          .then(function (response: any) {
            const {fullName} = response.data;
            setUu(fullName);
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error: any) {
            console.log(error);
          });
      } catch (error) {}
    }, 100);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    let a;
    setTimeout(async () => {
      try {
        a = await AsyncStorage.getItem('token');
        console.log('get In4 from Api: ' + a);
        var axios = require('axios');
        //const {token,username,id}=user;
        //let aaa:string=AsyncStorage.getItem('token');
        var config = {
          method: 'get',
          url: `${BASE_URL}users/me`,
          headers: {
            Authorization: 'Bearer ' + a,
          },
        };

        axios(config)
          .then(function (response: any) {
            const {fullName} = response.data;
            setUu(fullName);
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error: any) {
            console.log(error);
          });
      } catch (error) {}
    }, 500);

    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);
  //logout
  const Logout = async () => {
    dispatch(UserLogout());
  };

  return (
    <View style={Styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
      />
      <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ImageBackground source={Images.purpleBG} style={Styles.block_top}>
          <View style={Styles.block_top_view}>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <View style={Styles.View_avartar}>
                <Image
                  source={Images.Img_Profile}
                  style={Styles.Image_Profile}
                />
              </View>

              <View style={Styles.View2_Title}>
                <Text
                  style={{
                    color: 'gray',
                    justifyContent: 'flex-start',
                    textShadowColor: 'black',
                    textShadowRadius: 10,
                  }}>
                  Hello
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: 'lightgray',
                    textShadowColor: 'black',
                    textShadowRadius: 20,
                  }}>
                  {uu}
                </Text>
              </View>

              <View style={Styles.View_block_edit}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditProfile', {name: uu});
                  }}>
                  <Text style={Styles.View_Edit}>
                    <IconFontAwesome name="pencil" size={20} color="#fff" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              width: '95%',
            }}>
            <Image source={Images.mini} style={{width: 100, height: 60}} />
          </View>
        </ImageBackground>

        <View style={Styles.View_Body_block}>
          <View style={Styles.Item}>
            <TouchableOpacity>
              <View style={Styles.Item_title}>
                <IconFontAwesome name="home" style={Styles.icon_text} />
                <Text style={Styles.txt_name}>Trang cá nhân</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={Styles.Item}>
            <TouchableOpacity>
              <View style={Styles.Item_title}>
                <IconFontAntDesign name="message1" style={Styles.icon_text} />
                <Text style={Styles.txt_name}>Tin nhắn</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={Styles.Item}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}>
              <View style={Styles.Item_title}>
                <IconMaterialIcons name="security" style={Styles.icon_text} />
                <Text style={Styles.txt_name}>Đổi mật khẩu</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={Styles.Item}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('PitchDropDown');
                Alert.alert('13213')
              }}>
              <View style={Styles.Item_title}>
                <IconMaterialIcons
                  name="support-agent"
                  style={Styles.icon_text}
                />
                <Text style={Styles.txt_name}>Hỗ trợ</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={Styles.Item}>
            <TouchableOpacity onPress={() => Logout()}>
              <View style={Styles.Item_title}>
                <IconMaterialIcons
                  name="logout"
                  style={Styles.icon_text}
                  color="red"
                />
                <Text style={[Styles.txt_name, {color: 'red'}]}>Đăng xuất</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:"100%",
    // backgroundColor:'blue'
  },
  block_top: {
    flex: 2,
    backgroundColor: '#FFCCCC',
    justifyContent: 'flex-end',
    elevation: 50,
  },
  block_top_view: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    // backgroundColor:'blue'
    marginHorizontal: 10,
  },
  View_avartar: {
    width: '25%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  View2_Title: {
    flexDirection: 'column',

    justifyContent: 'center',
    // backgroundColor:'green',
    marginLeft: 5,
    width: '50%',
  },
  Image_Profile: {
    width: 80,
    height: 80,
    //alignItems: 'flex-end',
    //alignSelf:'stretch',
    borderRadius: 80,
    borderWidth: 3,
    borderColor: 'white',
  },
  View_block_edit: {
    //  backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  View_Edit: {
    backgroundColor: '#0066FF',
    width: 40,
    //height:40,
    borderRadius: 30,
    padding: 10,
    textAlign: 'center',
  },
  View_Body_block: {
    flex: 6,
    backgroundColor: '#ededef',
    // flexDirection:'column',
  },
  Item: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 20,

    //borderColor:'#C4C4C4',
    // borderBottomWidth:1
  },
  Item_title: {
    flexDirection: 'row',
  },
  icon_text: {
    fontSize: 20,
    marginRight: 10,
  },
  txt_name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default Profile;
