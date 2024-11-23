import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../utils/constant';
import {scaledSize} from '../utils/helper';

const FormControl = ({title, children}) => {
  return (
    <View style={styles.container} testID={'form-control'}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: scaledSize(5),
  },
  title: {
    fontSize: scaledSize(16),
    color: COLORS.app3A3A3A,
    paddingBottom: scaledSize(12),
  },
});

export default FormControl;
