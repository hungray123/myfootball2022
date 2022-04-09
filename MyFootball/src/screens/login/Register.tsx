import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

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
  ButtonText: {
    //fontFamily:'NunitoSasn-Black',
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
});

type Props = {
  navigation: any;
};
const SignUp: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.Title}>WELLCOME12😀</Text>
        </View>
        <View style={styles.form}>
          <TextInput style={styles.textInput} placeholder="Usernamee" />
          <TextInput style={styles.textInput} placeholder="Password" />
          <TextInput style={styles.textInput} placeholder="Re-Password" />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TabViewExample');
            }}>
            <Text style={styles.ButtonText}>REGISTER ➜</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SignUp;
