import React, { Component } from 'react'
import { Text, View } from 'react-native'
import GoogleLogin from '../components/googleLogin'

export class LoginScreen extends Component {
  render() {
    return (
      <View>
        <Text> Login in Callstreak </Text>
        <GoogleLogin/>
      </View>
    )
  }
}

export default LoginScreen
