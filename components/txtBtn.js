import  {View, StyleSheet, Text, Pressable} from "react-native"

const TxtBtn = ({title, txtColor, onPress}) => {
  return (
    <View style={styles.root}>
      <Pressable onPress={onPress}>
        <Text style={[styles.txt, {color: txtColor}]}>{title}</Text>
      </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
  root: {
    margin: 10
  },
  txt: {
    fontSize: 18
  }
})

export default TxtBtn