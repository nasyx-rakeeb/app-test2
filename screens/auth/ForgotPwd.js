import  {View, Keyboard, StyleSheet, Text, TextInput, Image} from "react-native"
import Button from "../../components/Button.js"
import axios from "axios"
import {useState} from "react"
import Loader from "../../components/Loader.js"
import DismissKeyboard from "../../components/DismissKeyboard.js"

const ForgotPwd = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const url ="https://prikshaprep.herokuapp.com/api/auth/forgot-password"
  const handleSubmit = async () => {
    try {
     Keyboard.dismiss()
     setLoading(true)
     const res = await axios.post(url, {email}, {headers: {"Content-Type": "application/json"}})
     JSON.stringify(res.data.message)
     if (res.status === 200) {
       navigation.navigate("Check Your Inbox", {email})
       setLoading(false)
     } else if (res.status !== 200) {
         setLoading(false)
     }
     setErrorMsg(res.data.message) 
    } catch (error) {
      setErrorMsg(error.response.data.message)
      setLoading(false)
    }
  }
  
  return (
    <DismissKeyboard>
    <View style={styles.root}>
      <View style={styles.top}>
        <View style={styles.top}>
          <Image style={styles.img} source={require("../../assets/images/forgotPwd.jpg")} />
        </View>
      </View>
      <View style={styles.bottom}>
        {errorMsg ? <Text style={styles.errMsg}>{errorMsg}</Text> : <Text style={styles.txt}>Enter your registered email address to receive a password reset link</Text>}
        <TextInput value={email} onChangeText={value => setEmail(value)} style={styles.input} placeholder="Enter your Email" placeholderTextColor="#2A454E" />
        <View style={styles.btn}>
          <Button title={loading ? <Loader color="#fff" /> : "Submit"} onPress={handleSubmit} bgColor="#2A454E" txtColor="white" />
        </View>
      </View>
    </View>
    </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
  root: {
    flex: 2,
    backgroundColor: "white"
  },
  top: {
    flex: 1
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
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    alignItems: "center",
    width: "100%",
    marginTop: 9
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#2A454E",
    borderRadius: 8,
    width: "80%",
    marginVertical: 8,
    padding: 8,
    paddingLeft: 15,
    fontWeight: "bold"
  },
  txt: {
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 2,
    marginVertical: 9,
    marginHorizontal: 30,
    color: "#2A454E",
    lineHeight: 30
  },
  errMsg: {
    color: "red",
    marginVertical: 8,
    textAlign: "center",
    marginHorizontal: 30,
  }
})

export default ForgotPwd