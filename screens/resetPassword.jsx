import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Calendar, Lock, Unlock } from 'lucide-react-native';
import { retrieveUserSession } from '../config/functions';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';


const ResetPassword = () => {

    const navigation = useNavigation();
 
    const [cnic, setCnic] = useState('');
    const [cellno, setCellNumber] = useState('');
    const [newpwd, setNewPwd] = useState('');
    const [currentUser,setCurrentUser] = useState('')
      // Start Date
const [dobopen, setdobOpen] = useState(false)
const [dobdate, setdobDate] = useState(new Date("1975-01-01"))
        

    useEffect(()=>{
    //    retrieveUserSession(setCurrentUser)
    },[])

function clearAll(){
    setCnic("");
    setCellNumber("");
    setNewPwd("");
   
}

// const userFeedback ={
//     userCnic:currentUser.userName,
//     feedBack:feedback
// }

function generate() {
    if(cnic === "" || cnic.length <13) {
        Alert.alert("Please Entrer your CNIC")
    } else if (cellno === "" || cellno.length < 11) {
        Alert.alert("Please Entrer your Cell Number")
    } else if (dobdate) {
        console.warn(dobdate + new Date()) 
    }else {
            var a = Math.random().toString(20).substring(2,6)
            // console.warn(Math.random().toString())

            setNewPwd(a)
        }}; 
   
    return (
        <ScrollView >
            <View className="  flex flex-col   p-2 justify-start">
                <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
                    {/* User Profile TAB*/}
                    <View className=" mt-1 w-full  ">

                        <View className=" p-5  bg-yellow-400  rounded-md  w-fit items-center justify-center flex ">
                           <Text className="text-black  text-xl">Forget Password</Text>
                            <Unlock size={25} stroke='black' strokeWidth={20} />
                            
                        </View>
                    </View>    
                    
              
                    {/* CNIC */}
                    <View className={styles.outerview}>
                        <View className="w-2/6 justify-center items-center rounded-md bg-slate-300"><Text className="text-black  ">CNIC </Text></View>
                    <View className="w-4/6 justify-start">
                    <TextInput
                            onChangeText={text => setCnic(text)}
                            value={cnic}
                            style={{padding: 10}}
                            className="text-black font-bold pl-5"
                            keyboardType='numeric'
                            maxLength={13}
                            placeholder='0000000000000'
                            placeholderTextColor={'grey'}
                            
                        />

                    </View>
                    </View>   

                     {/* Cell Number */}
                     <View className={styles.outerview}>
                        <View className="w-2/6 justify-center items-center rounded-md bg-slate-300"><Text className="text-black  ">Cell Number</Text></View>
                    <View className="w-4/6 justify-start">
                    <TextInput
                            onChangeText={text => setCellNumber(text)}
                            value={cellno}
                            style={{padding: 10}}
                            className="text-black font-bold pl-5"
                            keyboardType='numeric'
                            maxLength={11}
                            placeholder='0300xxxxxxx'
                            placeholderTextColor={'grey'}
                        />

                    </View>
                    </View> 
 

                       {/* Start Date*/}
   <View className={styles.outerview}>
   <View className=" w-2/6 justify-center items-center rounded-md bg-slate-300" ><Text className="text-black">Date Of Birth </Text></View>
            <View className="w-4/6 items-center ">
            <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={dobopen}
              date={dobdate}
              onConfirm={value => {
                setdobOpen(false);
                setdobDate(value);
              }}
              onCancel={() => {
                setdobOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {dobdate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setdobOpen(true)}>
              <Calendar stroke="black" fill="white" size={30} strokeWidth={1}></Calendar>
            </TouchableOpacity>
          </View>
            </View>
          </View>
                    

                      {/* New Auto Generated Password */}
                      <View className={styles.outerview}>
                        <View className="w-2/6 justify-center items-center rounded-md bg-slate-300"><Text className="text-black  ">New Password (One Time)</Text></View>
                    <View className="w-4/6 justify-center pl-10">
                    <Text className="text-black font-bold text-lg"> {newpwd == "" ? '' : newpwd}</Text>
                    </View>
                    </View>

                    <View className='flex flex-row mt-3 justify-center'>
                        <TouchableOpacity onPress={() => clearAll()} className='bg-[#fc4343] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>Clear</Text></   TouchableOpacity>
                    <TouchableOpacity onPress={()=>generate()} className='bg-[#29378a] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>Generate Password</Text></TouchableOpacity>
                     </View>

                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

export default ResetPassword;

const styles = {
    inputViolet:
        'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black ',
    inputVioletSmall:
        'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
    labelstyle:
        'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
    outerview:
        'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900 mt-2'
};