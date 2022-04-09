import React, { useEffect, useState } from "react";
import { View ,Text, Button, TextInput,StyleSheet,Image, TouchableOpacity} from "react-native";
import { useDispatch } from "react-redux";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Images from 'themes/index'
const DetailsFootball: React.FC<{navigation:any,route:any}>=({navigation,route})=>{
    const [ currentDate, setCurrentDate]=useState('')
    const {id} =route.params;
    const [data, setData] = React.useState('');
  
    useEffect(()=>{
        var date = new Date().getDate() //current date
        var month =new Date().getMonth() + 1
        var year = new Date().getFullYear()

        setCurrentDate(
            date + '/' + month + '/' + year + ' '
        )
       
    },[])
    const dispatch = useDispatch();
    // nút back lại đây
    function next(){
        //const {params} =route;
        //console.warn("check",params);
       // alert({params})
       // params.callback();//gọi  hàm callback
       //const aa= navigation.navigate('Sân 7',{screen:'HomeBooking',hung:id,});// truyền lại về View A
       const aa= navigation.navigate("PaymentScreen",{ID_next:id});// truyền lại về View A
       
       
        // const {goBack}=navigation;
    
      //  goBack();
        
        
     
        //goBack2();
    }
    return(
        <View>
           <View style={styles.Header}>
                <View style={styles.text_Date}>
                    <IconFontAwesome  name='calendar' color='white' />
                        <Text style={{height:30,fontSize:20, marginLeft:5,color:'white'}}>  
                        {currentDate}
                        </Text>
                        <Text>id ={id}</Text>
                    </View>
           </View>

            <View style={styles.Body_block}>
                <View  style={styles.body_wrap}>
                    <View style={styles.top_block}>
                    <IconFontAwesome name='timer'  color='black' style={{  marginVertical:3}} />
                        <Text style={styles.text_timeFootball}>  
                        15:00 - 16:30
                        </Text>
                    <Image source={Images.Icon_san_dau} style={{width:30,height:30}} />
                    </View>
                    <View style={{flexDirection:'column'}}>
                       <View style={styles.input_info}>
                            <Text><IconFontAwesome name="person"/></Text>
                            <TextInput placeholder='Nhap ten'>Hung Gem</TextInput> 
                       </View>
                       <View style={styles.input_info}>
                            <Text><IconFontAwesome name="phone"/></Text>
                            <TextInput placeholder='Nhap ten'>0961461262</TextInput> 
                       </View>
                        <TextInput placeholder="Thông tin thêm" multiline={true} numberOfLines={4}style={styles.input_info_area}></TextInput>

                        <View style={styles.input_info_2}>
                            <View style={styles.input_info_2_1}>
                                <Text>Tiền sân</Text>
                                <Text>350.000</Text>
                            </View>
                            <View style={styles.input_info_2_1}>
                                <Text style={styles.input_info_2_0}>Được giảm giá</Text>
                                <View style={styles.input_info_2_2}>
                                <Text style={{marginVertical:5}}>15.000</Text>
                                <Text style={{borderLeftWidth:1,borderLeftColor:'gray',marginHorizontal:5,textAlign:'right'}} ></Text>
                                <Text style={{marginVertical:5,fontWeight:'bold'}}>%</Text>
                                </View>
                            </View>
                            <View style={styles.input_info_2_1}>
                                <Text style={styles.input_info_2_0}>Tiền đặt cọc</Text>
                                <Text style={styles.input_info_2_3} >150.000</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    {/* <Text style={styles.btn_ss} onPress={()=>navigation.navigate('NavigationBack',{ix:5})}> ĐẶT SÂN</Text> */}
                    <Text style={styles.btn_ss} onPress={()=>next()}> ĐẶT SÂN</Text>
                </View>

            </View> 
            
        </View>
    )
}
const  styles =StyleSheet.create({
    Header:{
        height:'40%',
        backgroundColor:'green',
        borderRadius:30
    },
    text_Date:{
        flexDirection:'row',
        backgroundColor:'#006400',
        padding:5,
        paddingHorizontal:10,
        marginHorizontal:20,
        borderRadius:5,

        marginTop:50,
        
    },

    // Body
    Body_block:{
        backgroundColor:'white',
        paddingHorizontal:10,
        marginHorizontal:20,
        marginTop:-160,
        borderRadius:10,
        elevation:20,
    },
    body_wrap:{
        marginHorizontal:10,
        marginVertical:10,
        padding:5
    },
    top_block:{
        flexDirection:'row'
    },
    text_timeFootball:{
        fontSize:15,
        color:'black',
        marginBottom:15,
        marginVertical:5,
        marginEnd:3
    },
    input_info:{
        flexDirection:'row',
        padding:8,
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey',
        marginVertical:8
    },
    input_info_area:{
        height:100,
        textAlignVertical:'top',
        padding:8,
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey',
        marginVertical:8
    },
    input_info_2:{
      
        padding:8,
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey',
        marginVertical:8
    },
    input_info_2_0:{
        paddingHorizontal:6,
        paddingVertical:6,
    },
    input_info_2_1:{
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'space-between',
        //alignItems:'flex-start'
        marginEnd:30,
        
        
    },
    input_info_2_2:{
        flexDirection:'row',
        //marginVertical:10,
       // justifyContent:'space-between',
        //alignItems:'flex-start'
        //marginEnd:30,
        paddingHorizontal:6,
        //paddingVertical:6,
        width:'40%',
        borderRadius:6,
        borderWidth:1,
        borderColor:'gray',
        justifyContent:'flex-end'
    },
    input_info_2_3:{
        flexDirection:'row',
        //marginVertical:10,
       // justifyContent:'space-between',
        //alignItems:'flex-start'
        //marginEnd:30,
        paddingHorizontal:6,
        paddingVertical:6,
        width:'40%',
        borderRadius:6,
        borderWidth:1,
        borderColor:'gray',
        textAlign:'right',
        color:'red'
    },
    btn_ss:{
        justifyContent:'center',
        backgroundColor:'green',
        color:'white',
        borderRadius:30,
        paddingVertical:15,
        textAlign:'center',
        marginHorizontal:60,
        marginBottom:20

    }
    
})
export default DetailsFootball;