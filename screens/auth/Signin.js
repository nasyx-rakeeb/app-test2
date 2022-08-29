import  {View, Keyboard, Platform, KeyboardAvoidingView, StyleSheet, Text, TextInput, Image} from "react-native"
import Button from "../../components/Button.js"
import TxtBtn from "../../components/txtBtn.js"
import axios from "axios"
import {useState} from "react"
import Loader from "../../components/Loader.js"
import DismissKeyboard from "../../components/DismissKeyboard.js"
import * as SecureStore from 'expo-secure-store'
import {save} from "../../utils/secureStore.js"

const Signin = ({navigation}) => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const url = "https://prikshaprep.herokuapp.com/api/auth/signin"
  
  const handleLogIn = async () => {
    try {
      Keyboard.dismiss()
      setLoading(true)
      const res = await axios.post(url, {email: user, password}, {headers: {"Content-Type": "application/json", "Accept": "application/json"}})
      JSON.stringify(res.data.message)
      setErrorMsg(res.data.message)
      if (res.data.status === "success") {
        const user = res.data
        save("userId", user.data.user.userId)
        save("token", user.token)
        navigation.navigate("AppStack", {screen: "Home"})
        setLoading(false)
      } else if (res.data.status !== "success") {
          setLoading(false)
      }
    } catch (error) {
      setErrorMsg(error.response.data.message)
      setLoading(false)
    }
  }
  
  const handleForgotPwd = () => {
    navigation.navigate("Forgot Password")
  }
  
  const handleSignup = () => {
    navigation.navigate("Signup")
  }
  
  return (
    <DismissKeyboard>
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.root}>
      <View style={styles.top}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require("../../assets/images/login.png")} />
        </View>
      </View>
      <View style={styles.bottom}>
        {errorMsg && <Text style={styles.errMsg}>{errorMsg}</Text>}
        <TextInput value={user} onChangeText={value => setUser(value)} style={styles.input} placeholder="Email or phone number with + and country code" placeholderTextColor="#5549AB" />
        <TextInput value={password} secureTextEntry={true} onChangeText={value => setPassword(value)} style={styles.input} placeholder="Enter your password here" placeholderTextColor="#5549AB" />
        <View style={styles.loginBtn}>
        <Button title={loading ? <Loader color="white" /> : "Next"} onPress={handleLogIn} bgColor="#5549AB" txtColor="white" />
        <View style={styles.otherBtns}>
          <TxtBtn title="Forgot Password" txtColor="#5549AB" onPress={handleForgotPwd} />
          <TxtBtn title="Signup" txtColor="#5549AB" onPress={handleSignup} />
        </View>
        </View>
      </View>
    </KeyboardAvoidingView>
    </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
  root: {
    flex: 2,
    backgroundColor: "white"
  },
  top: {
    flex: 1,
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
  bottom: {
    flex: 1,
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    width: "80%",
    borderRadius: 8,
    marginVertical: 9,
    padding: 8,
    borderColor: "#5549AB"
  },
  otherBtns: {
    flexDirection: "row",
  },
  loginBtn: {
    marginVertical: 9,
    alignItems: "center",
    width: "100%"
  },
  errMsg: {
    color: "red",
    marginVertical: 8,
    textAlign: "center",
    marginHorizontal: 30,
  }
})

export default Signin