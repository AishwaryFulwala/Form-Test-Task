import {Dimensions} from 'react-native';

export const FORM_CONFIG = [
  {
    key: '7d5a2af7-51c9-4915-a362-82dad827dff7',
    label: 'Text fields',
    type: 'input',
    info_message: '',
    validation_message: '',
    addition_text: '',
    attrs: {
      required: false,
    },
    short_key: '',
    deleted: false,
    name: 'text',
    type_ref: 'text',
    icon: 'bi-type',
    display: true,
    column: {
      width: 120,
    },
    visibility: {
      table: true,
      form: true,
      board: true,
    },
  },
  {
    key: 'e8a78403-97d9-4d23-9221-9e4b6dff1d7c',
    label: 'Select list',
    type: 'select',
    info_message: '',
    validation_message: '',
    addition_text: '',
    attrs: {
      required: false,
    },
    short_key: '',
    deleted: false,
    name: 'select',
    type_ref: 'dropdown',
    icon: 'bi-list-check',
    display: true,
    column: {
      width: 120,
    },
    options: {
      list: [
        {
          label: 'Option 1',
          value: 'option1',
        },
        {
          label: 'Option 2',
          value: 'option2',
        },
        {
          label: 'Option 3',
          value: 'option3',
        },
      ],
    },
    visibility: {
      table: true,
      form: true,
      board: true,
    },
  },
  {
    key: 'c1fb2b56-a5f7-496e-88cb-3684d2628ee9',
    label: 'Checkbox',
    type: 'checkbox',
    info_message: '',
    validation_message: '',
    addition_text: '',
    attrs: {
      required: false,
    },
    short_key: '',
    deleted: false,
    name: 'checkbox',
    type_ref: 'boolean',
    icon: 'bi-check-square',
    display: true,
    column: {
      width: 120,
    },
    visibility: {
      table: true,
      form: true,
      board: true,
    },
  },
  {
    key: '1eefb041-2f8e-4438-bbe0-18cdc717ccd8',
    label: 'Date field',
    type: 'input',
    info_message: '',
    validation_message: '',
    addition_text: '',
    attrs: {
      required: false,
    },
    short_key: '',
    deleted: false,
    name: 'date',
    type_ref: 'date',
    icon: 'bi-calendar-date',
    default_value: '+0d',
    display: true,
    column: {
      width: 120,
    },
    visibility: {
      table: true,
      form: true,
      board: true,
    },
  },
  {
    key: '6492fcb7-caca-43cf-ad6b-0c3e531524fc',
    label: 'Time',
    type: 'input',
    info_message: '',
    validation_message: '',
    addition_text: '',
    attrs: {
      required: false,
    },
    short_key: '',
    deleted: false,
    name: 'time',
    type_ref: 'time',
    icon: 'bi-clock',
    default_value: '+0h',
    column: {
      width: 120,
    },
    display: true,
    visibility: {
      table: true,
      form: true,
      board: true,
    },
  },
  {
    key: 'd721549e-e6c6-474f-a362-edd24d3df599',
    label: 'Photo',
    type: 'photo',
    info_message: '',
    validation_message: '',
    addition_text: '',
    attrs: {
      required: false,
    },
    short_key: '',
    deleted: false,
    name: 'photo',
    type_ref: 'photo',
    icon: 'bi-camera',
    display: true,
    column: {
      width: 120,
    },
    options: {
      size: 800,
      settings: [
        {
          label: 'x-large',
          value: 1200,
        },
        {
          label: 'large',
          value: 1000,
        },
        {
          label: 'medium',
          value: 800,
        },
        {
          label: 'small',
          value: 600,
        },
      ],
    },
    visibility: {
      form: true,
    },
  },
  {
    key: 'd722696b-6150-46a9-bf1e-10266a05a554',
    label: 'Signature',
    type: 'signature',
    info_message: '',
    validation_message: '',
    addition_text: '',
    attrs: {
      required: false,
    },
    short_key: '',
    deleted: false,
    name: 'signature',
    type_ref: 'signature',
    icon: 'bi-pen',
    display: true,
    column: {
      width: 120,
    },
    visibility: {
      form: true,
    },
  },
];

export const DATE_FORMAT = 'DD/MM/YYYY';

export const TIME_FORMAT = 'HH:mm';

export const COLORS = {
  app0C5B5B: '#0C5B5B',
  app0C489C: '#0C489C',
  app111111: '#111111',
  app1D2038: '#1D2038',
  app3480EB: '#3480EB',
  app3A3A3A: '#3A3A3A',
  app3A7BD6: '#3A7BD6',
  app767577: '#767577',
  app81B0FF: '#81B0FF',
  appEEEEEE: '#EEEEEE',
  appF4F3F4: '#F4F3F4',
  appFF0000: '#FF0000',
  appFFFFFF: '#FFFFFF',
};

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const tabData = {
  NewRecord: {name: 'New Record', icon: 'create'},
  SaveRecord: {name: 'Save Record', icon: 'document-text'},
};

export const MMKV_STORAGE_KEY = 'mmkv-data';
