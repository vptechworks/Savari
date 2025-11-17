import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const PhoneInputExample = () => {
  const phoneInput = (useRef < PhoneInput) | (null > null); // ✅ Correct ref
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your phone number</Text>

      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="IN" // Default India
        layout="first"
        onChangeText={text => setPhoneNumber(text)}
        onChangeFormattedText={text => setFormattedValue(text)}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textInput}
      />

      <Text style={styles.output}>Raw: {phoneNumber}</Text>
      <Text style={styles.output}>Formatted: {formattedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 18, marginBottom: 10 },
  phoneContainer: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    paddingVertical: 0,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  output: { marginTop: 10, fontSize: 16 },
});

export default PhoneInputExample;
