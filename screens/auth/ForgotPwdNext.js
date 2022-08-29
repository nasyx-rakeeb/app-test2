import  {View, StyleSheet, Text, Image} from "react-native"

const ForgotPwdNext = ({route}) => {
  const {email} = route.params
  const to = <Text style={[styles.txt, {color: "#00DFC0"}]}>{email}</Text>
  
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require("../../assets/images/forgotPwdNext.jpg")} />
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.txt}>An email with password reset link has been sent to {to} please check your inbox and reset your password</Text>
      </View>
    </View>
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
  bottom: {
    flex: 1,
    justifyContent: "center"
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
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.5,
    lineHeight: 30,
    marginVertical: 12,
    marginHorizontal: 30,
    color: "#385A64",
    textAlign: "center"
  }
})

export default ForgotPwdNext