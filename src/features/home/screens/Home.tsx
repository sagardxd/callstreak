import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../../app/context/AuthContext'
import ContactScreen from '../../contacts/screens/ContactScreen';

const HomeScreen = () => {
  const {user, logout} = useAuth();
  return (
    <View>
      <Text>Hello {user?.displayName}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <ContactScreen/>
    </View>
  )
}

export default HomeScreen