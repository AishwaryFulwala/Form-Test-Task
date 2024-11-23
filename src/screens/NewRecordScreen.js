import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {scaledSize, setStorageData, uuid} from '../utils/helper';
import {COLORS, FORM_CONFIG} from '../utils/constant';
import {
  PhotoControl,
  ButtonControl,
  SelectControl,
  SwitchControl,
  DateTimeControl,
  SignatureControl,
  TextInputControl,
} from '../components';

const controlMapper = {
  text: TextInputControl,
  select: SelectControl,
  checkbox: SwitchControl,
  date: DateTimeControl,
  time: DateTimeControl,
  photo: PhotoControl,
  signature: SignatureControl,
};

const NewRecordScreen = () => {
  const [record, setRecord] = useState({});
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const onSave = () => {
    if (Object.keys(record)) {
      setStorageData({...record, id: uuid(), created_at: new Date()});
      setRecord({});
    }
  };

  const onChange = useCallback(
    (key, value) =>
      setRecord(prev => ({
        ...prev,
        [key]: value,
      })),
    [],
  );

  const renderItem = ({item, index}) => {
    const Component = controlMapper[item.name];
    return (
      <Component
        key={index}
        id={item.key}
        name={item.name}
        label={item.label}
        value={record[item.key]}
        list={item?.options?.list}
        onChange={onChange}
        setScrollEnabled={setScrollEnabled}
      />
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>New - React Native ctrl</Text>
        <ButtonControl
          title={'Save'}
          style={styles.bgColor}
          onPress={onSave}
          disabled={!Object.keys(record)?.length}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={{...styles.headerTitle, ...styles.marginBottom10}}>
          Test ctrl
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
          data={FORM_CONFIG}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  marginBottom10: {
    marginBottom: scaledSize(10),
  },
  bgColor: {
    backgroundColor: COLORS.app0C5B5B,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scaledSize(20),
  },
  headerTitle: {
    fontWeight: '700',
    color: COLORS.app1D2038,
    fontSize: scaledSize(18),
  },
  formContainer: {
    flex: 1,
    margin: scaledSize(10),
    padding: scaledSize(10),
    backgroundColor: COLORS.appFFFFFF,
  },
});

export default NewRecordScreen;
