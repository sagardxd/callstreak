import React, { useRef, useState } from 'react';
import { TextInput, View, StyleSheet, Text, Keyboard, TouchableOpacity } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { addUser } from '../services/userService';
import PhoneNumberInputForm from './ui/PhoneNumberInputForm';
import OtpInputForm from './ui/OtpInputForm';

const PhoneSignIn: React.FC = () => {
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  // Send verification code to phone number
  const signInWithPhoneNumber = async (phoneNumber: string) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  // Confirm the verification code
  const confirmCode = async () => {
    if (!confirm) return;

    try {
      await confirm.confirm(code);
      await addUser({phoneNumber});
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleInput = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneNumber(cleaned);

    if (cleaned.length === 10) {
      Keyboard.dismiss(); // Hide keyboard
    }
  };


  return confirm ?
    <OtpInputForm code={code} setCode={setCode} confirmCode={confirmCode}/>
    :
    <PhoneNumberInputForm
      inputRef={inputRef}
      phoneNumber={phoneNumber}
      handleInput={handleInput}
      signInWithPhoneNumber={signInWithPhoneNumber} />
};

export default PhoneSignIn;


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
