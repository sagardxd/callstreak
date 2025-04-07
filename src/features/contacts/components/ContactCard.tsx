import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import ContactFormModal from './ContactFormModal'
import reactNativeContacts from 'react-native-contacts'
import { Contact } from 'react-native-contacts/type'

type ContactCardProps = {
  item: Contact
}

const ContactCard: React.FC<ContactCardProps> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  const confirmContactDeleteAlert = (contact:Contact) => {
    Alert.alert(
      'Permission Blocked',
      'Contact write permission is blocked. Please enable it from settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Contact',
          onPress: () => handleContactDelete(contact)
        },
      ]
    )
  }

  const handleContactDelete = async(contact: Contact) => {
    try {
      await reactNativeContacts.deleteContact(contact)
      
    } catch (error) {
      
    }
  }


  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.displayName || 'Unnamed Contact'}</Text>
      <Text style={styles.phone}>{item.phoneNumbers[0].number}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity>
          <Text onPress={() => setShowModal(true)}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'red'}} onPress={() =>confirmContactDeleteAlert(item)}>Delete</Text>
        </TouchableOpacity>
      </View>

      <ContactFormModal task='edit' visible={showModal} contact={item} onClose={() => setShowModal(false)} />
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
  btnContainer: {
    flexDirection: 'row',
    gap:5
  }
})