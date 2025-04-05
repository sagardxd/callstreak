import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../../app/context/AuthContext'

const Home = () => {
  const {user, logout} = useAuth();
  return (
    <View>
      <Text>Hello {user?.displayName}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home