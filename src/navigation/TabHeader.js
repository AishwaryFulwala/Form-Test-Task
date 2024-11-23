import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../utils/constant';
import {scaledSize} from '../utils/helper';

const TabHeader = ({route}) => {
  const name = route.name === 'NewRecord' ? 'New Record' : 'Save Record';

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scaledSize(10),
    marginHorizontal: scaledSize(20),
  },
  headerTitle: {
    fontWeight: '500',
    color: COLORS.app0C489C,
    fontSize: scaledSize(24),
  },
});

export default TabHeader;
