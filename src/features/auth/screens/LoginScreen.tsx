import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import GoogleLogin from '../components/googleLogin'
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import PhoneSignIn from '../components/phoneLogin';


const LoginScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Callstreak</Text>
      {/* <GoogleLogin /> */}
      <PhoneSignIn />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  }
})

export default LoginScreen
