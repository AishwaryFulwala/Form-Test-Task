import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {COLORS} from '../utils/constant';
import {scaledSize} from '../utils/helper';

const ButtonControl = ({title, style, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      onPress={onPress}
      disabled={disabled}
      testID={'button-control'}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaledSize(15),
    paddingVertical: scaledSize(10),
    borderRadius: scaledSize(7),
  },
  title: {
    fontSize: scaledSize(14),
    color: COLORS.appFFFFFF,
  },
});

export default ButtonControl;
