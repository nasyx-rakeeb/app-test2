import {StatusBar} from 'expo-status-bar'
import {StyleSheet} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from "./screens/Home.js"
import {Welcome, Signin, Signup, ForgotPwdNext, ForgotPwd, LoggedOut, VerifyPhone, ChangePwd} from "./screens/auth/IE.js"
import {useEffect, useState} from "react"
import * as SecureStore from "expo-secure-store"
import LoadingScreen from "./screens/LoadingScreen.js"

const Stack = createNativeStackNavigator()

const App = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    const setUser = async () => {
      setUserId(await SecureStore.getItemAsync("userId"))
      setToken(await SecureStore.getItemAsync("token"))
    }
    setUser()
    if (token !== null && userId !== null) {
        setIsAuthenticated(true)
  }
  })
  
  const AppStack = () => {
    return (
      <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} options={{headerStyle: {backgroundColor: "#000"}, headerTintColor: "white"}} />
        <Stack.Screen name="Forgot Password" component={ForgotPwd} options={{headerStyle: {backgroundColor: "#2a454e"}, headerTintColor: "white"}} />
        <Stack.Screen name="Check Your Inbox" component={ForgotPwdNext} options={{headerStyle: {backgroundColor: "#00dfc0"}, headerTintColor: "#3a5864"}} /> 
        <Stack.Screen name="Change Password" component={ChangePwd} options={{headerStyle: {backgroundColor: "#e5322b"}, headerTintColor: "white"}} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </>  
      )
  }
  
  const AuthStack = () => {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} options={{headerStyle: {backgroundColor: "#1b4152"}, headerTintColor: "white"}} /> 
          <Stack.Screen name="Signin" component={Signin} options={{headerStyle: {backgroundColor: "#5549ab"}, headerTintColor: "white"}} />
          <Stack.Screen name="Signup" component={Signup} options={{headerStyle: {backgroundColor: "#26dec0"}, headerTintColor: "#35474f"}} /> 
          <Stack.Screen name="Verify Phone Number" component={VerifyPhone} options={{headerStyle: {backgroundColor: "#d268cc"}, headerTintColor: "white"}} />
          <Stack.Screen name="Logged Out" component={LoggedOut} options={{headerStyle: {backgroundColor: "#5a6e7f"}, headerTintColor: "white"}} />
          <Stack.Screen name="AppStack" component={AppStack} options={{headerShown: false}} />
       </Stack.Navigator> 
      </>
      )
  }
  
  return (
    <NavigationContainer style={styles.root}>
      <StatusBar style="light" />
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  ) 
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
})

export default App