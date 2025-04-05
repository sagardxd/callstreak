import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

type OtpInputFormProps = {
    code: string
    setCode: (code: string) => void
    confirmCode: () => void
}

const OtpInputForm: React.FC<OtpInputFormProps> = ({code, setCode, confirmCode}) => {
  return (
    <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={code}
              placeholderTextColor="#000"
              onChangeText={(text) => setCode(text)}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              style={styles.input}
              maxLength={6}
            />
            <TouchableOpacity style={styles.btn} onPress={confirmCode}>
              <Text style={styles.btnText}>Confirm Code</Text>
            </TouchableOpacity>
          </View>
        </View>
  )
}

export default OtpInputForm

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

