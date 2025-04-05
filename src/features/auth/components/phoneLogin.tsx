import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const PhoneSignIn: React.FC = () => {
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState<string>('');

  // Send verification code to phone number
  const signInWithPhoneNumber = async (phoneNumber: string) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
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
      console.log('Code confirmed!');
    } catch (error) {
      console.error('Invalid code:', error);
    }
  };

  if (!confirm) {
    return (
      <View style={styles.container}>
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber('+91 7970114444')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={code}
        onChangeText={(text) => setCode(text)}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        style={styles.input}
      />
      <Button title="Confirm Code" onPress={confirmCode} />
    </View>
  );
};

export default PhoneSignIn;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    borderRadius: 5,
  },
});
