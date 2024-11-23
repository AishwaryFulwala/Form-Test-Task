import dayjs from 'dayjs';
import {MMKV} from 'react-native-mmkv';

import {
  MMKV_STORAGE_KEY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  DATE_FORMAT,
  TIME_FORMAT,
} from './constant';

export const getFormattedDateTime = (dateTime, mode) => {
  return dayjs(dateTime).format(mode === 'date' ? DATE_FORMAT : TIME_FORMAT);
};

const storage = new MMKV();

export const getStorageData = () => {
  try {
    const jsonString = storage.getString(MMKV_STORAGE_KEY);
    return jsonString ? JSON.parse(jsonString) : [];
  } catch (e) {
    console.error('Error in get data: ', e);
  }
};

export const setStorageData = data => {
  try {
    const storageData = getStorageData() || [];
    storage.set(MMKV_STORAGE_KEY, JSON.stringify([...storageData, data]));
  } catch (e) {
    console.error('Error in set data: ', e);
  }
};

export const scaledSize = size => {
  const baseWidth = 375;
  const baseHeight = 667;

  const scaleWidth = SCREEN_WIDTH / baseWidth;
  const scaleHeight = SCREEN_HEIGHT / baseHeight;
  const scale = Math.min(scaleWidth, scaleHeight);

  return Math.ceil(size * scale);
};

export const uuid = (length = 6) => {
  return Math.floor(Math.random() * Math.pow(10, length));
};
