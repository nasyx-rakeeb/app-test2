import  {View, StyleSheet, Text, Image} from "react-native"
import Button from "../../components/Button.js"

const LoggedOut = ({navigation}) => {
  const handleHome = () => {
    navigation.navigate("Welcome")
  }
  
  return (
    <View style={styles.root}>
      <Image style={styles.img} source={require("../../assets/images/loggedOut.png")} />
      <Text style={styles.txt}>Logged Out Successfully</Text>
      <Button title="Take Me Home" onPress={handleHome} bgColor="#5A6E7F" txtColor="white" />
    </View>
    )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  txt: {
    fontSize: 25,
    letterSpacing: 2,
    marginBottom: 30,
    color: "#5A6E7F",
    fontWeight: "bold"
  }
})

export default LoggedOut