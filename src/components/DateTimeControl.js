import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import IIcon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

import FormControl from './FormControl';
import {COLORS, DATE_FORMAT} from '../utils/constant';
import {getFormattedDateTime, scaledSize} from '../utils/helper';

dayjs.extend(customParseFormat);

const DateTimeControl = ({id, label, name, value, onChange, readOnly}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateTimeValue = useMemo(() => {
    const dateTimeString = value || getFormattedDateTime(new Date(), name);
    if (name === 'date') {
      return dayjs(dateTimeString, DATE_FORMAT).toDate();
    }
    const [hours, minutes] = dateTimeString.split(':');
    return dayjs().set('hours', hours).set('minutes', minutes).toDate();
  }, [value, name]);

  const onValueChange = updatedValue => {
    onChange(id, getFormattedDateTime(updatedValue, name));
    toggleModal();
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <FormControl title={label}>
      <TouchableOpacity
        testID={'date-time-container'}
        style={styles.dateTimeContainer}
        onPress={toggleModal}
        disabled={readOnly}>
        <Text style={styles.title}>{value}</Text>
        <IIcon
          color={COLORS.app3A3A3A}
          name={name === 'date' ? 'calendar-clear-outline' : 'time-outline'}
          size={scaledSize(20)}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        mode={name}
        open={isModalOpen}
        date={dateTimeValue}
        onConfirm={onValueChange}
        onCancel={toggleModal}
        testID={'date-time-modal'}
      />
    </FormControl>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.app111111,
    fontSize: scaledSize(14),
  },
  dateTimeContainer: {
    borderRadius: scaledSize(5),
    padding: scaledSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.appEEEEEE,
  },
});

export default DateTimeControl;
