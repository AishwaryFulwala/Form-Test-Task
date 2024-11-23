import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

import {COLORS} from '../utils/constant';
import {scaledSize} from '../utils/helper';

const SwitchControl = ({id, label, value, onChange, readOnly}) => {
  const onValueChange = () => {
    onChange(id, !value);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: COLORS.app767577, true: COLORS.app81B0FF}}
        thumbColor={value ? COLORS.app3A7BD6 : COLORS.appF4F3F4}
        ios_backgroundColor={COLORS.app767577}
        onValueChange={onValueChange}
        value={value}
        disabled={readOnly}
        testID={'switch'}
      />
      <Text style={styles.switchText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaledSize(5),
  },
  switchText: {
    marginLeft: scaledSize(5),
    fontSize: scaledSize(16),
    color: COLORS.app3A3A3A,
  },
});

export default SwitchControl;
