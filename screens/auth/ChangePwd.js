import {View, Keyboard, StyleSheet, KeyboardAvoidingView, Platform, Text, TextInput, Image} from "react-native"
import Button from "../../components/Button.js"
import {useState, useEffect} from "react"
import axios from "axios"
import Loader from "../../components/Loader.js"
import DismissKeyboard from "../../components/DismissKeyboard.js"

import * as SecureStore from "expo-secure-store"

const ChangePwd = () => {
  useEffect( () => {
    const setUser = async () => { 
      setUserId(await SecureStore.getItemAsync("userId"))
    }
    setUser()
  }, [])
  
  const url = "https://prikshaprep.herokuapp.com/api/auth/update-password"
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [userId, setUserId] = useState(null)
  const [errorMsg, setErrorMsg] = useState("") 
  const [loading, setLoading] = useState(false)
  const [sucMsg, setSucMsg] = useState(false)
  
  const handleChange = async () => {
     try {
       Keyboard.dismiss()
       setLoading(true)
       const res = await axios.patch(url, {userId, currentPassword, newPassword, confirmNewPassword}, {headers: {"Content-Type" : "application/json"}})
       JSON.stringify(res.data.message)
       setErrorMsg(res.data.message)
       if (res.data.status === "success") {
         setLoading(false)
         setErrorMsg("")
         setSucMsg(true)
       }
       if (res.data.status !== "success") {
            setLoading(false)
          }
     } catch (error) {
         setErrorMsg(error.response.data.message)
         setLoading(false)
     }
  } 

  return (
  <DismissKeyboard>
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.root}>
      <View style={styles.top}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require("../../assets/images/changePwd.png")} />
        </View>
      </View>
      <View style={styles.bottom}>
        {errorMsg && <Text style={styles.errMsg}>{errorMsg}</Text>}
        {sucMsg && <Text style={styles.sucMsg}>Your Password was changed successfully</Text>}
        <TextInput value={currentPassword} secureTextEntry={true} onChangeText={value => setCurrentPassword(value)} style={styles.input} placeholder="Old Password" placeholderTextColor="#E5322B" />
        <TextInput value={newPassword} secureTextEntry={true} onChangeText={value => setNewPassword(value)} style={styles.input} placeholder="New Password" placeholderTextColor="#E5322B" />
        <TextInput value={confirmNewPassword} secureTextEntry={true} onChangeText={value => setConfirmNewPassword(value)} style={styles.input} placeholder="Confirm New Password" placeholderTextColor="#E5322B" />
        <View style={styles.btn}>
          <Button title={loading ? <Loader color="white" /> : "Change"} onPress={handleChange} bgColor="#675EB0" txtColor="white" />
        </View>
      </View> 
    </KeyboardAvoidingView>
  </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
  root: {
    flex: 2,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    alignItems: "center"
  },
  imgContainer: {
    justifyContent: "center"
  },
  img: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    alignSelf: "center"
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E5322B",
    borderRadius: 8,
    width: "80%",
    marginVertical: 8,
    padding: 8,
    fontWeight: "bold",
    paddingLeft: 20
  },
  btn: {
    width: "100%",
    alignItems: "center",
    marginTop: 9
  },
  errMsg: {
    color: "red",
    marginVertical: 8,
    textAlign: "center",
    marginHorizontal: 30,
  },
  sucMsg: {
    color: "green",
    marginVertical: 8,
    textAlign: "center",
    marginHorizontal: 30
  }
})

export default ChangePwd