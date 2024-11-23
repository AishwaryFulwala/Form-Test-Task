import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import IIcon from 'react-native-vector-icons/Ionicons';

import FormControl from '../components/FormControl';
import {scaledSize} from '../utils/helper';
import {COLORS} from '../utils/constant';

const SelectControl = ({id, label, list, value, onChange, readOnly}) => {
  const onValueChange = updatedValue => {
    onChange(id, updatedValue.value);
  };

  const renderDropItem = item => {
    return (
      <View style={styles.dropDownItemContainer}>
        {item.value === value ? (
          <IIcon
            color={COLORS.app3A3A3A}
            name={'checkmark-sharp'}
            size={scaledSize(20)}
          />
        ) : (
          <View style={styles.width20} />
        )}
        <Text style={styles.dropDownItemText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <FormControl title={label}>
      <Dropdown
        testID={'dropdown'}
        style={styles.dropDown}
        placeholderStyle={styles.dropDownDisplayItem}
        selectedTextStyle={styles.dropDownDisplayItem}
        data={list}
        maxHeight={300}
        labelField={'label'}
        valueField={'value'}
        placeholder={''}
        value={value}
        onChange={onValueChange}
        renderItem={renderDropItem}
        disable={readOnly}
      />
    </FormControl>
  );
};

const styles = StyleSheet.create({
  width20: {
    width: scaledSize(20),
  },
  dropDown: {
    backgroundColor: COLORS.appEEEEEE,
    borderRadius: scaledSize(5),
    padding: scaledSize(10),
    height: scaledSize(50),
  },
  dropDownItemContainer: {
    padding: scaledSize(17),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownItemText: {
    flex: 1,
    fontSize: scaledSize(16),
    marginLeft: scaledSize(5),
    color: COLORS.app111111,
  },
  dropDownDisplayItem: {
    fontSize: scaledSize(14),
    color: COLORS.app111111,
  },
});

export default SelectControl;
