import {View, ActivityIndicator, StyleSheet} from "react-native"

const Loader = ({size, color}) => {
  return (
    <View style={[styles.root, styles.horizontal]}>
      <ActivityIndicator size="small" color={color} />
    </View>
    )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default Loader