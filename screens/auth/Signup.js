import  {View, Platform, Keyboard, StyleSheet, Text, TextInput, Image, KeyboardAvoidingView} from "react-native"
import Button from "../../components/Button.js"
import TxtBtn from "../../components/txtBtn.js"
import axios from "axios"
import {useState} from "react"
import Loader from "../../components/Loader.js"
import DismissKeyboard from "../../components/DismissKeyboard.js"
import {save} from "../../utils/secureStore.js"

const Signup = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const url = 'https://prikshaprep.herokuapp.com/api/auth/signup'
    
    const handleSignUp = async () => {
      try {
          Keyboard.dismiss()
          setLoading(true)
          const res = await axios.post(url, {email, number, password, confirmPassword}, {headers: {"Content-Type": "application/json"}})
          JSON.stringify(res.data.message)
          setErrorMsg(res.data.message)
          if (res.data.status === "success") {
            navigation.navigate("Verify Phone Number", {email, number, password})
            setLoading(false)
          } else if (res.data.status !== "success") {
            setLoading(false)
          }
      } catch (error) {
        setErrorMsg(error.response.data.message)
        setLoading(false)
    }}
    
  const handleSignIn = () => {
    navigation.navigate("Signin")
  }
  
  return (
  <DismissKeyboard>
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.root}>
      <View style={styles.top}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require("../../assets/images/signup.png")} />
        </View>
      </View>
      <View style={styles.bottom}>
        {errorMsg && <Text style={styles.errMsg}>{errorMsg}</Text>}
        <TextInput value={email} onChangeText={value => setEmail(value)} style={styles.input} placeholder="Email" placeholderTextColor="#26DEC0" />
        <TextInput value={number} onChangeText={value => setNumber(value)} style={styles.input} placeholder="Phone No with + and country code" placeholderTextColor="#26DEC0" />
        <TextInput value={password} secureTextEntry={true} onChangeText={value => setPassword(value)} style={styles.input} placeholder="Password" placeholderTextColor="#26DEC0" />
        <TextInput value={confirmPassword} secureTextEntry={true} onChangeText={value => setConfirmPassword(value)} style={styles.input} placeholder="Confirm Password" placeholderTextColor="#26DEC0" />
        <View style={styles.btn}>
          <Button title={loading ? <Loader color="#26DEC0" /> : "Next"} onPress={handleSignUp} bgColor="#35474F" txtColor="white" />
        </View>
        <TxtBtn title="Already have an account? SignIn Instead" txtColor="#35474F" onPress={handleSignIn} />
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
    flex: .8
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
    flex: 1.2,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  btn: {
    alignItems: "center",
    width: "100%",
    marginTop: 9
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#26DEC0",
    borderRadius: 8,
    width: "80%",
    marginVertical: 8,
    padding: 8,
    paddingLeft: 15,
    fontWeight: "bold"
  },
  errMsg: {
    color: "red",
    marginVertical: 8,
    textAlign: "center",
    marginHorizontal: 30,
  }
})

export default Signup