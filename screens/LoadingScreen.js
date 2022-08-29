import  {View, StyleSheet, Text} from "react-native"

const LoadingScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.txt}>LOADING....</Text>
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
    fontSize: 50,
    color: "purple",
    letterSpacing: 2,
    fontWeight: "bold"
  }
})

export default LoadingScreen