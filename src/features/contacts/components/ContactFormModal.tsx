import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Alert,
  Linking,
} from 'react-native'
import React, { useState } from 'react'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import reactNativeContacts from 'react-native-contacts'
import { Contact } from 'react-native-contacts/type'

type ContactFormModalProps = {
  visible: boolean
  onClose: () => void
  task: 'add' | 'edit'
  contact?: Contact
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  visible,
  onClose,
  task,
  contact,
}) => {
  const [name, setName] = useState<string>(contact ? contact.displayName : '')
  const [phone, setPhone] = useState<string>(contact ? contact.phoneNumbers[0].number : '')

  const getPermission = () => {
    if (Platform.OS === 'android') return PERMISSIONS.ANDROID.WRITE_CONTACTS
    if (Platform.OS === 'ios') return PERMISSIONS.IOS.CONTACTS
    return null
  }

  const showPermissionAlert = () => {
    Alert.alert(
      'Permission Blocked',
      'Contact write permission is blocked. Please enable it from settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
      ]
    )
  }

  const checkContactPermissions = async (): Promise<boolean> => {
    const permission = getPermission()
    if (!permission) {
      console.log('Device not supported')
      return false
    }

    const status = await check(permission)

    if (status === RESULTS.GRANTED) {
      return true
    } else if (status === RESULTS.DENIED) {
      const newStatus = await request(permission)
      if (newStatus === RESULTS.GRANTED) return true
      if (newStatus === RESULTS.BLOCKED) showPermissionAlert()
    } else if (status === RESULTS.BLOCKED) {
      showPermissionAlert()
    }

    return false
  }

  const handleAddContact = async () => {
    const hasPermission = await checkContactPermissions()
    console.log('permission', hasPermission,)
    if (!hasPermission) return

    try {
      const result = await reactNativeContacts.addContact({
        givenName: name,
        phoneNumbers: [{ label: 'mobile', number: phone }],
      })
      console.log(result)
      setName('')
      setPhone('')
      onClose();
    } catch (error) {
      console.error(error)
    }
    
  }

  const handleEditContact = async () => {
    const hasPermission = await checkContactPermissions()
    if (!hasPermission) return

   try {
    console.log(contact)
    if (!contact?.recordID) {
      console.error('Contact recordID is missing');
      return;
    }
    const result = await reactNativeContacts.updateContact({
      ...contact,
      givenName: name,
      phoneNumbers: [{ label: 'mobile', number: phone }],
    })

    console.log(result)
    setName('')
    setPhone('')
    onClose();

   } catch (error) {
      console.log(error)
   }
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {task === 'add' ? 'Add Contact' : 'Edit Contact'}
          </Text>

          <Text style={styles.modalSubtitle}>
            {task === 'edit' && contact
              ? `Editing: ${contact.givenName} (${contact.phoneNumbers[0].number})`
              : 'Enter new contact details'}
          </Text>

          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="Name"
            placeholderTextColor="#000"
            style={styles.input}
          />
          <TextInput
            onChangeText={setPhone}
            value={phone}
            placeholder="Phone"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            style={styles.input}
            maxLength={10}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                task === 'add'
                  ? handleAddContact
                  : () => handleEditContact()
              }
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>
                {task === 'add' ? 'Add Contact' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ContactFormModal

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalSubtitle: {
    marginVertical: 10,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
})
