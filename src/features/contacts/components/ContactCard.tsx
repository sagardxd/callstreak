import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MyContact } from '../screens/CallLogScreen'

type ContactCardProps = {
    item: MyContact
}

const ContactCard: React.FC<ContactCardProps> = ({item}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name || 'Unnamed Contact'}</Text>
      <Text style={styles.phone}>{item.phoneNumber}</Text>
    </View>
  )
}

export default ContactCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
      },
      name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
      },
      phone: {
        fontSize: 14,
        color: '#666',
      },
    })