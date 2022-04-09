import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import IconFeather from 'react-native-vector-icons/Feather';

//import * as Animatable from 'react-native-animatable';

import {useSelector, useDispatch} from 'react-redux';
import { ApplicationState, onLogin } from 'src/redux';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import axios from 'axios';
import Images from 'themes/index';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  form: {
    flexDirection: 'column',
    margin: 20,
    //backgroundColor:'blue'
  },
  Body: {
    flexDirection: 'column',
    // height:400,
    backgroundColor: 'green',
  },
  Title: {
    // backgroundColor:'blue',
    fontSize: 25,
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,
    borderRadius: 20,
    width: 250,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  text_user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    width: 250,
    padding: 5,
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,

    borderWidth: 1,

    borderColor: 'gray',
  },
  text_pass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    width: 250,
    padding: 5,
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,

    borderWidth: 1,

    borderColor: 'gray',
  },
  ButtonText: {
    fontSize: 13,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
    marginStart: 10,
    marginEnd: 10,
  },
  OtherLoginView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  Other_Logo: {
    width: 50,
    height: 50,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 12,
    textAlign: 'center',
  },
});

type Props = {
  title: string;
  navigation: any;
  signIn: any;
};
const Login: React.FC<Props> = ({navigation}) => {
  const [check, setCheck] = useState(false);

  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,

    isValidUser: true,
    isValidPassword: true,
  });

  const dispatch = useDispatch();
  const {token} = useSelector((state: ApplicationState) => state.userReducer);

  //console.log("loi gi " + error);
  console.log('token o login' + token);

  const onTapLogin = () => {
    dispatch(onLogin(data.username, data.password));
    console.log(data.username);
  };

  const textInputChange = (val: string) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
      console.log(data.username);
    }
    // console.log('username: ',data.username )
  };
  const handleValidUser = (val: any) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const handlePasswordChange = (val: any) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
    // console.log('password: '+ data.password)
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.Title}>😀😀😀</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.text_user}>
            <TextInput
              style={{flex: 1}}
              autoCapitalize="none"
              placeholder="Tài khoản"
              onChangeText={val => textInputChange(val)}
            />
          </View>

          <View style={styles.text_pass}>
            <TextInput
              placeholder="Mật khẩu"
              style={{flex: 1}}
              onChangeText={val => handlePasswordChange(val)}
              secureTextEntry={data.secureTextEntry ? true : false}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <IconFeather name="eye-off" color="grey" size={20} />
              ) : (
                <IconFeather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              onTapLogin();
            }}>
            <Text style={styles.ButtonText}>Đăng nhập ➜</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.OtherLoginView}>
          <View>
            <TouchableOpacity>
              <Image source={Images.Fb} style={styles.Other_Logo} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={Images.gg} style={styles.Other_Logo} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={Images.tw} style={styles.Other_Logo} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Login;
