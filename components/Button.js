import  {View, StyleSheet, Text, Pressable} from "react-native"

const Button = ({title, onPress, bgColor, txtColor}) => {
  return (
    <View style={[styles.root, {backgroundColor: bgColor}]}>
      <Pressable onPress={onPress}>
        <Text style={[styles.btnTxt, {color: txtColor}]}>{title}</Text>
      </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
  root: {
    width: "80%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 10
  },
  btnTxt: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 1.5
  }
})

export default Button