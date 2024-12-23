import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch, Alert } from 'react-native';
import { User } from 'lucide-react-native';
import '../../config'
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { verifyDuplicateUser } from '../../config/functions';
import EncryptedStorage from 'react-native-encrypted-storage';
import { retrieveUserSession } from '../../config/functions';







const SignUp = () => {
  useEffect(()=>{
    retrieveUserSession(setCurrentUser)
   
  },[]) 
  const user_status = [ "User" ,"Admin"]; 


  let ranks = ["CPO" ,"SPO" ,"PO", "APO", "JPO", "ACP","UDC","LDC","PG"];  
  
  const rank = useRef({});   
  const region = useRef({});   
  const zone = useRef({});   
  const sector = useRef({});   
  const beat = useRef({});   
  const role = useRef({});   
  
  const today = new Date()
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(today.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;

  const [currentUser, setCurrentUser] = useState({});
const [searchcnic, setCnic] = useState("");
const [officername, setOfcrname] = useState("");
const [officercnic, setOfcrcnic] = useState("");
const [officercell, setOfcrcell] = useState("");
const [officerpwd, setOfcrpwd] = useState("");
const [officerrank, setOfcrrank] = useState("");
const [officerbelt, setOfcrbelt] = useState("");

//=======================================================office satates 
const [officerRegion, setOfcrRegion] = useState("");
const [officerzone, setOfcrzone] = useState("");
const [officersector, setOfcrsector] = useState("");
const [officerbeat, setOfcrbeat] = useState("");

//=================overall offices
const[regions,setRegions] = useState("")
const[zones,setZones] = useState("")
const[sectors,setSectors] = useState("")
const[beats,setbeats] = useState("")
//============================================================
const [officerrole, setOfcrrole] = useState("");
//================================================================ function to get offices data 
const getRegion = async () => {
  
  await axios.get(`${global.BASE_URL}/ofc/region`).then(async response => {
    const region = response.data;
    const regions = []
    if (region) {
      region.map( item=>{
        regions.push(item.region)
      }) 
      setRegions(regions)
     
    }
  });
};
const Zones =[]
//=============================================================get zone 
const getZone = async (region) => {
  
  await axios.get(`${global.BASE_URL}/ofc/zone/${region}`).then(async response => {
    const zone = response.data;
   const data =[]
    if (zone) {
      zone.map( item=>{
        data.push(item.zone)
      }) 
      setZones(data)
    }
   
  });
};
//=============================================================get sectors
const getSector = async (zone) => {
 
  await axios.get(`${global.BASE_URL}/ofc/sector/${zone}`).then(async response => {
    const sector = response.data;
   const data =[]
    if (sector) {
      
      sector.map( item=>{
        data.push(item.sector)
      }) 
      setSectors(data)
     
    }
   
  });
};
//=============================================================get sectors
const getBeat = async (sector) => {
  
  await axios.get(`${global.BASE_URL}/ofc/beat/${sector}`).then(async response => {
    const beat = response.data;
   const data =[]
    if (beat) {
      beat.map( item=>{
        data.push(item.beat)
      }) 
      setbeats(data)
    }
   
  });
};

//
//==============================================================================================/>
 // Clear Data
function  clearAll (){

  setCnic("");
  setOfcrname("")
  setOfcrcnic("")
  setOfcrcell("")
  setOfcrpwd("")
  setOfcrrank("")
  setOfcrRegion("")
  setOfcrzone("")
  setOfcrsector("")
  setOfcrbeat("")
  setOfcrrole("")
  setOfcrbelt("")
  rank.current.reset();
  region.current.reset();
  sector.current.reset();
  zone.current.reset();
  role.current.reset();
  beat.current.reset();
}


const user ={
  userCnic:officercnic,
  userName:officername,
  userPwd:officerpwd,
  cellNo :officercell ,
  rank:officerrank,
  beltNo:officerbelt,
  role:officerrole,
  status:"Active",
  beatId :officerbeat ,
  sectorId: officersector,
  zoneId:officerzone,
  region:officerRegion,
  date:formattedDate,
  addedBy: currentUser.userName,

}

//------------------------save user
const saveUser = async () => {
  console.log(user)
  if(officercnic && officerbelt && officercell && officername && officerpwd && officerrank && officersector && officerrole && officerRegion && officerzone && officerbeat ) {
      await fetch(`${global.BASE_URL}/users/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }) 
        .then(response => {
          if (response.ok) {
            Alert.alert('User created successfully');
            clearAll();
          } else {
            Alert.alert('Alert','User already Exists');
          }
  
        })
  
        .catch(error => {
          Alert.alert(error);
        });
      } else { Alert.alert("Note: Please fill all fields");}
      }
useEffect(()=>{
  getRegion()
},[regions])
return (
    <ScrollView className=" ">
    <View className=" flex flex-col   ">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>

        {/* Sing Up page */}
        <View className="  mt-1 w-full  ">

          <View className=" bg-yellow-400  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
            <Text className="text-black text-lg rounded-md font-bold ">Create New User</Text>
            
          </View>
        </View>

         {/* FIND */}
        {/* <View className={`${styles.outerview} `} style={{}} >
          
          <View className=" w-4/6  border border-gray-200 items-center ">
              <TextInput 
              placeholderTextColor={'grey'}
              placeholder='Search User CNIC'
              maxLength={13}
              keyboardType='numeric'
              value={searchcnic}            
              onChangeText={e=>setCnic(e)}
              className=' text-black rounded-md  text-lg' />
              
          </View>
          <View className="flex flex-row-reverse  bg-orange-200  justify-center items-center w-2/6"><Text className="text-black text-lg  font-bold">Search</Text>
           */}
          {/* <Search stroke='black' /> */}
          {/* </View>
        </View> */}

{/*   officer CNIC */}
<View className={styles.outerview} >
          <View className={styles.labelstyle}><Text className="text-black  font-bold">Officer CNIC*</Text></View>
          <View className=" w-4/6  items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='0000000000000'
              keyboardType='numeric'
              maxLength={13}
              onChangeText={e=>setOfcrcnic(e)}
              value={officercnic}
              className=' border-black text-black rounded-md  text-lg'
              onBlur={()=>{verifyDuplicateUser(officercnic,clearAll)}}
              />

          </View>
        </View>

        {/*   officer Name */}
        <View className={styles.outerview} >
          <View className={styles.labelstyle}><Text className="text-black  font-bold">Officer Name*</Text></View>
          <View className=" w-4/6  items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Officer Name'
              maxLength={60}
              value={officername}
              onChangeText={e=>setOfcrname(e)}
              className=' border-black text-black rounded-md  text-lg' />

          </View>
        </View>




        {/* Cell No */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Cell Number*</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='00000000000'
              maxLength={11}
              keyboardType='numeric'
              value={officercell}
              onChangeText={e=>setOfcrcell(e)}
              className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>


        {/* Password */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">User Password*</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Password'
              maxLength={10}
              secureTextEntry={true}
              value={officerpwd}
              onChangeText={e=>setOfcrpwd(e)}
              className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>

        {/* Rank*/}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Rank*</Text></View>
          <View className="w-4/6 items-center ">
          <View className=" m-1  z-50">
              <SelectDropdown
                ref={rank}
                data= {ranks}
                value={officerrank}
                onSelect={(selectedItem, index) => {
                  setOfcrrank(selectedItem);
                }}
                defaultButtonText={officerrank}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>

          </View>
        </View>

        {/* Belt No. */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Belt No.*</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Belt No'
              maxLength={10}
              value={officerbelt}
              onChangeText={e=>setOfcrbelt(e)}
              className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>
        
        {/* Region */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Region*</Text></View>
          <View className="w-4/6 items-center">
          <View className=" m-1  z-50">
              <SelectDropdown
              ref={region}
                data= {regions}
                value={officerRegion}
                onSelect={ (selectedItem, index) => {
                  
                  setOfcrRegion(selectedItem);
                 getZone(selectedItem)
                }}
                defaultButtonText={officerRegion}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>


          </View>
        </View>
        {/* Zone */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Zone*</Text></View>
          <View className="w-4/6 items-center">
          <View className=" m-1  z-50">
              <SelectDropdown
              ref={zone}
                data= {zones}
                value={officerzone}
                onSelect={(selectedItem, index) => {
                  setOfcrzone(selectedItem);
                  getSector(selectedItem)
                }}
                defaultButtonText={officerzone}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>


          </View>
        </View>

        {/* Sector */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Sector*</Text></View>
          <View className="w-4/6 items-center">
          <View className=" m-1  z-50">
              <SelectDropdown
              ref={sector}
                data= {sectors}
                value={officersector}
                onSelect={(selectedItem, index) => {
                  setOfcrsector(selectedItem);
                  getBeat(selectedItem)
                 

                }}
                defaultButtonText={officersector}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>
          </View>
        </View>

        {/* Beat */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Beat*</Text></View>
          <View className="w-4/6 items-center">
          <View className=" m-1  z-50">
              <SelectDropdown
              ref={beat}
                data= {beats}
                value={officerbeat}
                onSelect={(selectedItem, index) => {
                  setOfcrbeat(selectedItem);
                 
                }}
                defaultButtonText={officerbeat}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>
          </View>
        </View>

        {/* Role*/}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Role*</Text></View>
          <View className="w-4/6 items-center">
          
          <View className=" m-1  z-50">
              <SelectDropdown
              ref={role}
                data= {user_status}
                value={officerrole}
                onSelect={(selectedItem, index) => {
                  setOfcrrole(selectedItem);
                }}
                defaultButtonText='Select Status'
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>
          </View>
        </View>

         {/* Buttons Save - Clear -Update */}
         <View className="flex-row items-center justify-center ">
              

{/* 
              <View className="">
                <TouchableOpacity className="bg-[#29378a] px-7 py-2 rounded-md m-2">
                  <Text className="text-white  text-lg">Update</Text>
                </TouchableOpacity>
              </View> */}
              <View className="">
                <TouchableOpacity onPress={()=>clearAll()} className="bg-red-700 px-8 py-2 rounded-md m-2">
                  <Text className="text-white text-lg">Clear</Text>
                </TouchableOpacity>
              </View>
              <View className=" ">
                <TouchableOpacity onPress= {()=>saveUser()} className="bg-[#227935]  px-8 py-2 rounded-md m-2">
                  <Text className="text-white  text-lg">Save</Text>
                </TouchableOpacity>
              </View>

            </View>


      </KeyboardAvoidingView>
    </View>
  </ScrollView>
  );
};


export default SignUp;

const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
    labelstyle:
    'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
     outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'
};