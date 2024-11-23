import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';

import ButtonControl from './ButtonControl';
import {scaledSize} from '../utils/helper';
import FormControl from '../components/FormControl';
import {COLORS, SCREEN_HEIGHT} from '../utils/constant';

const PhotoControl = ({id, label, value, onChange, readOnly}) => {
  const onValueChange = async () => {
    const result = await launchImageLibrary();

    if (result?.assets?.length) {
      onChange(id, result?.assets[0]?.uri);
    }
  };

  const onRemove = () => {
    onChange(id, '');
  };

  return (
    <FormControl title={label}>
      {value ? (
        <Image
          source={{uri: value}}
          style={styles.image}
          testID={'photo-image'}
        />
      ) : (
        <View
          style={{...styles.iconContainer, ...styles.image}}
          testID={'camera-icon'}>
          <IIcon
            color={COLORS.app3A3A3A}
            name={'camera-outline'}
            size={scaledSize(150)}
          />
        </View>
      )}
      {!readOnly && (
        <View style={styles.actionContainer}>
          <ButtonControl
            title={'Select Image'}
            style={styles.selectButton}
            onPress={onValueChange}
          />
          {!!value && (
            <ButtonControl
              title={'Remove'}
              style={styles.bgRed}
              onPress={onRemove}
            />
          )}
        </View>
      )}
    </FormControl>
  );
};

const styles = StyleSheet.create({
  bgRed: {
    backgroundColor: COLORS.appFF0000,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: SCREEN_HEIGHT / 5.5,
    width: '100%',
    marginBottom: scaledSize(10),
  },
  actionContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  selectButton: {
    backgroundColor: COLORS.app0C5B5B,
    marginRight: scaledSize(10),
  },
});

export default PhotoControl;
