import React, { useState } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { addUser } from '../services/userService';
import PhoneNumberInputForm from './ui/PhoneNumberInputForm';
import OtpInputForm from './ui/OtpInputForm';
import Spinner from 'react-native-loading-spinner-overlay';

const PhoneSignIn: React.FC = () => {
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
      await addUser({ phoneNumber });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleInput = (text: string) => {
    setPhoneNumber(text);

    if (text.length === 10) {
      Keyboard.dismiss();
    }
  };


  return confirm ?
    <OtpInputForm code={code} setCode={setCode} confirmCode={confirmCode} />
    :
    <PhoneNumberInputForm
      phoneNumber={phoneNumber}
      handleInput={handleInput}
      signInWithPhoneNumber={signInWithPhoneNumber}
      setLoading={setLoading}
    />


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
