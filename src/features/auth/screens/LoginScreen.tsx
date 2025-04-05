import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GoogleLogin from '../components/googleLogin'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Callstreak</Text>
      <GoogleLogin />
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
