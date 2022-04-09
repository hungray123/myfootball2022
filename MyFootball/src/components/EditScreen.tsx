import React, {useState} from 'react';
import {View, Text, Button, TextInput, Alert, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {onChangeName} from 'src/redux';

interface Props {
  route: any;
  navigation: any;
}

const EditScreen: React.FC<Props> = ({navigation, route}) => {
  const props = route.params;
  console.log(props.id);

  const [textInput, setTextInput] = useState(props.name);
  const dispatch = useDispatch();
  const back = () => {
    // const {goBack}=navigation;
    // goBack();
    // Alert.alert(textInput);

    if (props.id === 1) {
      dispatch(onChangeName(textInput));
    } else if (props.id === 2) {
      console.log('Email');
    } else if (props.id === 3) {
      console.log('Phone');
    } else {
      console.log('lỗi ID');
    }
    setTimeout(() => {
      navigation.popToTop('EditProfile');
    }, 2000);
  };
  return (
    <View style={{marginHorizontal: 20, marginVertical: 5}}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <Text>{props.title}</Text>
      <TextInput
        value={textInput}
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          marginTop: 10,
          borderRadius: 5,
          padding: 2,
        }}
        onChangeText={setTextInput}
      />
      <Text style={{marginVertical: 5, fontSize: 12, marginBottom: 15}}>
        Họ & tên gồm 2 từ trở lên
      </Text>
      <Button
        title="Lưu thay đổi"
        onPress={() => {
          back();
        }}></Button>
    </View>
  );
};
export default EditScreen;
