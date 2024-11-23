import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {getStorageData, scaledSize} from '../utils/helper';
import {COLORS, FORM_CONFIG} from '../utils/constant';
import {
  PhotoControl,
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

const SaveRecordScreen = () => {
  const [displayData, setDisplayData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const data = getStorageData();
      setDisplayData([...data]);
    }
  }, [isFocused]);

  const getDisplayData = () => {
    setIsLoading(true);
    const data = getStorageData();
    setDisplayData([...data]);
    setIsLoading(false);
  };

  const renderItem = ({item, index: itemIndex}) => {
    return (
      <View key={itemIndex} style={styles.recordContainer}>
        <Text style={styles.recordTitle}>{`Record No. ${itemIndex + 1}`}</Text>
        {FORM_CONFIG.map((config, configIndex) => {
          const value = item[config.key];
          if (value) {
            const Component = controlMapper[config.name];
            return (
              <Component
                key={configIndex}
                readOnly
                value={value}
                label={config.label}
                name={config.name}
                list={config?.options?.list}
              />
            );
          }
          return null;
        })}
      </View>
    );
  };

  return displayData?.length ? (
    <FlatList
      testID={'flatlist'}
      showsVerticalScrollIndicator={false}
      data={displayData}
      renderItem={renderItem}
      refreshing={isLoading}
      onRefresh={getDisplayData}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.emptyText}>No Records</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scaledSize(20),
  },
  emptyText: {
    fontWeight: '700',
    color: COLORS.app1D2038,
    fontSize: scaledSize(18),
  },
  recordContainer: {
    flex: 1,
    margin: scaledSize(10),
    padding: scaledSize(10),
    borderRadius: scaledSize(10),
    backgroundColor: COLORS.appFFFFFF,
  },
  recordTitle: {
    fontWeight: '700',
    color: COLORS.app1D2038,
    fontSize: scaledSize(18),
  },
});

export default SaveRecordScreen;
