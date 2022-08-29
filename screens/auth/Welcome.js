import  {View, StyleSheet, Text, Image} from "react-native"
import Button from "../../components/Button.js"

const Welcome = ({navigation}) => {
  const handleSignUp = () => {
    navigation.navigate("Signup")
  }
  const handleSignIn = () => {
    navigation.navigate("Signin")
  }
  
  return (
    <View style={styles.root}>
      <View style={styles.imgContainer}>
        <Image source={require("../../assets/images/welcome.png")} style={styles.img} />
      </View> 
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>Welcome To NSX Studio</Text>
        <Text style={styles.desc}>Well for now i have nothing to write here, but later i will be adding anything here, Till then stay tuned</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button title="Sign Up" onPress={handleSignUp} bgColor="#1B4152" txtColor="white" />
        <Button title="Sign In" onPress={handleSignIn} bgColor="#456EAB" txtColor="white" />
      </View> 
    </View>
    )
}

const styles = StyleSheet.create({
  root: {
    flex: 3,
    backgroundColor: "white"
  },
  imgContainer: {
    flex: 2.3,
    justifyContent: "center"
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 1
  },
  txtContainer: {
    flex: 1,
    paddingHorizontal: 38,
    justifyContent: "center"
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    letterSpacing: 1,
    paddingBottom: 10
  },
  desc: {
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 1,
    lineHeight: 25
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
})

export default Welcome