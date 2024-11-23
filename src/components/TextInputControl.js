import React from 'react';
import {Platform, StyleSheet, TextInput} from 'react-native';

import FormControl from './FormControl';
import {COLORS} from '../utils/constant';
import {scaledSize} from '../utils/helper';

const TextInputControl = ({id, label, value, onChange, readOnly}) => {
  const onValueChange = updatedValue => {
    onChange(id, updatedValue);
  };

  return (
    <FormControl title={label}>
      <TextInput
        style={{
          ...styles.textInput,
          ...(Platform.OS === 'ios' ? {paddingVertical: scaledSize(12)} : {}),
        }}
        onChangeText={onValueChange}
        value={value}
        editable={!readOnly}
        testID={'text-input-control'}
      />
    </FormControl>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: COLORS.app111111,
    fontSize: scaledSize(14),
    borderRadius: scaledSize(5),
    paddingHorizontal: scaledSize(10),
    backgroundColor: COLORS.appEEEEEE,
  },
});

export default TextInputControl;
