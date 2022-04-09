import React from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Images from 'src/themes';
const STYLES = ['default', 'dark-content', 'light-content'];
interface Props {
  route: any;
  navigation: any;
}
const EditProfile: React.FC<Props> = ({navigation, route}) => {
  const {name} = route.params;
  return (
    <View style={Styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
      />
      <ImageBackground
        source={Images.purpleBG}
        resizeMode="cover"
        imageStyle={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
        style={Styles.View_Top}>
        <View style={Styles.View_top_header}>
          <View style={{width: '33%'}}>
            <Text></Text>
          </View>
          <View style={Styles.Title_Header_block}>
            <Text style={Styles.Title_Header}>Thông tin</Text>
          </View>
        </View>
        <View style={Styles.View_top_body}>
          <Image source={Images.Img_Profile} style={Styles.Avatar} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditScreen', {
                id: 1,
                title: 'Họ & tên',
                name: name,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 30,
              }}>
              <Text style={Styles.txt_UserName}>{name}</Text>
              <Icon
                name="pencil"
                size={25}
                color="gray"
                style={{marginLeft: 10}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={Styles.View_body}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditScreen', {
              id: 2,
              title: 'Email',
              name: 'hungvan804@gmail.comm',
            });
          }}>
          <View style={Styles.body_block}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="pencil" size={20} color="#900" style={{padding: 5}} />
              <Text style={Styles.txt_info}> Email</Text>
            </View>
            <TextInput
              editable={false}
              placeholder="Hungvan804@gmail.com"
              style={Styles.txt_info_2}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditScreen', {
              id: 3,
              title: 'Điện thoại',
              name: '0961461262',
            });
          }}>
          <View style={Styles.body_block}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="mobile" size={24} color="#900" style={{padding: 5}} />
              <Text style={Styles.txt_info}> Điện thoại</Text>
            </View>
            <TextInput
              editable={false}
              placeholder="0961461262"
              style={Styles.txt_info_2}
            />
          </View>
        </TouchableOpacity>
        <View style={Styles.body_block}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="facebook-square"
              size={20}
              color="#900"
              style={{padding: 5}}
            />
            <Text style={Styles.txt_info}> Facebook</Text>
          </View>
          <TextInput placeholder="shyn.one.love" style={Styles.txt_info_2} />
        </View>
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  View_Top: {
    flex: 0.35,
    height: '100%',
    //backgroundColor: "purple",
    borderRadius: 50,
  },
  View_top_header: {
    flexDirection: 'row',
    height: '30%',
    //justifyContent: 'space-around',
    alignItems: 'flex-end',
    // backgroundColor:'green',
    marginBottom: 5,
  },
  Title_Header_block: {
    width: '33%',
    //  backgroundColor:'red',
    // fontSize:17,
    // fontWeight:'bold',
    alignItems: 'center',
    height: 30,
    //fontWeight:'bold',
  },
  Title_Header: {
    // width:'33%',
    //backgroundColor:'red',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
    // alignItems: 'center',
    // height:50,
    //fontWeight:'bold',
    color: 'white',
  },
  btn_Save_block: {
    width: '33%',
    // backgroundColor:'green',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btn_Save: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: 'green',
    fontWeight: 'bold',
    color: 'white',
  },
  View_top_body: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    // backgroundColor:'pink'
  },
  Avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: 'white',
    borderWidth: 2,
  },
  txt_UserName: {
    fontSize: 28,
    marginVertical: 10,
    textAlign: 'center',
    marginStart: 5,
    color: 'white',
    fontWeight: 'bold',
  },

  //View_body
  View_body: {
    flex: 0.5,
    marginTop: 20,
  },
  body_block: {
    marginHorizontal: 30,
    marginTop: 5,
    //paddingVertical: 15,
    elevation: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  txt_info: {
    fontSize: 15,
    paddingVertical: 3,
    color: 'grey',
    marginTop: 5,
  },
  txt_info_2: {
    fontSize: 15,
    paddingVertical: 3,
    color: 'black',
    marginHorizontal: 33,
  },
});
export default EditProfile;
