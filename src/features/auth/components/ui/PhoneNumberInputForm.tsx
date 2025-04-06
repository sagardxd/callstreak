import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

type PhoneNumberInputFormProps = {
  phoneNumber: string
  handleInput: (text: string) => void
  signInWithPhoneNumber:  (text: string) => void
  
}

const PhoneNumberInputForm: React.FC<PhoneNumberInputFormProps>= ({ phoneNumber, handleInput, signInWithPhoneNumber}) => {
  return (
          <View style={styles.container}>
            <View style={styles.inputWrapper}>
              <Text style={styles.prefix}>+91</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={handleInput}
                placeholder="Enter your phone number"
                placeholderTextColor="#000"
                keyboardType="number-pad"
                maxLength={10}
              />
              <TouchableOpacity style={styles.btn} onPress={() => signInWithPhoneNumber(phoneNumber)}>
              <Text style={styles.btnText}>Send Otp</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.counter}>{phoneNumber.length} / 10 digits</Text>
            
          </View>
        );
}

export default PhoneNumberInputForm

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: '90%',
  },
  prefix: {
    fontSize: 16,
    marginRight: 6,
    color: '#000',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  counter: {
    marginTop: 6,
    fontSize: 12,
    color: '#555',
  },
  btn: {
    margin: 5,
    padding: 8,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff'
  }
});
