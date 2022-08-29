import  {View, StyleSheet, Text, TextInput, Image} from "react-native"
import Button from "../../components/Button.js"
import {useState} from "react"
import axios from "axios"
import Loader from "../../components/Loader.js"
import {save} from "../../utils/secureStore.js"

const VerifyPhone = ({route, navigation}) => {
  const {email, number, password} = route.params
  const [otp, setOtp] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const url = 'https://prikshaprep.herokuapp.com/api/auth/verify-mobile'
  
  const handleVerify = async () => {
    try {
      setLoading(true)
      const res = await axios.post(url, {email, number, password, otp}, {headers: {"Content-Type": "application/json"}})
      JSON.stringify(res.data.message)
      setErrorMsg(res.data.message)
      if (res.data.status === "success") {
        const user = res.data
        save("userId", user.data.user.userId)
        save("token", user.token)
        navigation.navigate("Home")
        setLoading(false)
      } else if (res.data.status !== "success") {
          setLoading(false)
      }
    } catch (error) {
      setErrorMsg(error.response.data.message)
      setLoading(false)
    }
  }
  
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require("../../assets/images/VerifyPhone.png")} />
        </View>
      </View>
      <View style={styles.bottom}> 
        {errorMsg ? <Text style={styles.errMsg}>{errorMsg}</Text> : <Text style={styles.txt}>An OTP has been sent to your phone number, please check your inbox</Text>}
        <TextInput value={otp} onChangeText={value => setOtp(value)} keyboardType="numeric" style={styles.input} placeholder="Enter OTP here" placeholderTextColor="#D268CC" />
        <View style={styles.btn}>
          <Button title={loading ? <Loader color="#fff" /> : "Verify"} onPress={handleVerify} bgColor="#2A454E" txtColor="white" />
        </View>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  root: {
    flex: 2
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
    justifyContent: "flex-start"
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#D268CC",
    padding: 8,
    width: "80%",
    borderRadius: 8,
    marginVertical: 9,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  btn: {
    marginVertical: 9,
    alignItems: "center",
    width: "100%"
  },
  txt: {
    color: "#2A454E",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 32,
    letterSpacing: 2,
    lineHeight: 27,
    marginVertical: 12
  },
  errMsg: {
    color: "red",
    marginVertical: 8,
    textAlign: "center",
    marginHorizontal: 30,
  }
})

export default VerifyPhone