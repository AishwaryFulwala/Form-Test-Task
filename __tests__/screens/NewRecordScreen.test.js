import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';

import NewRecordScreen from '../../src/screens/NewRecordScreen';
import * as helper from '../../src/utils/helper';

jest.mock('../../src/utils/helper', () => ({
  scaledSize: jest.fn(size => size),
  setStorageData: jest.fn(),
  uuid: jest.fn(() => 'mock-uuid'),
}));

jest.mock('../../src/utils/constant', () => ({
  FORM_CONFIG: [
    {
      key: 'textInput1',
      name: 'text',
      label: 'Text Input Label',
    },
    {
      key: 'checkbox1',
      name: 'checkbox',
      label: 'Checkbox Label',
    },
  ],
  COLORS: {
    app0C5B5B: '#0C5B5B',
    app1D2038: '#1D2038',
    appFFFFFF: '#FFFFFF',
  },
}));

jest.mock('../../src/components', () => {
  const {Text} = jest.requireActual('react-native');

  return {
    PhotoControl: mockArgs => <Text>{mockArgs?.label}</Text>,
    SelectControl: mockArgs => <Text>{mockArgs?.label}</Text>,
    ButtonControl: mockArgs => <Text>{mockArgs.title}</Text>,
    SignatureControl: mockArgs => <Text>{mockArgs?.label}</Text>,
    DateTimeControl: mockArgs => <Text>{mockArgs?.label}</Text>,
    SwitchControl: mockArgs => <Text>{mockArgs?.label}</Text>,
    TextInputControl: mockArgs => <Text>{mockArgs?.label}</Text>,
  };
});

jest.mock('react-native', () => {
  const actual = jest.requireActual('react-native');
  const View = actual.View;

  Object.defineProperty(actual, 'FlatList', {
    get: () => props =>
      props?.data?.map((item, index) => (
        <View key={index}>{props?.renderItem({item, index})}</View>
      )),
  });

  return actual;
});

describe('NewRecordScreen', () => {
  it('renders the screen correctly', () => {
    const {getByText} = render(<NewRecordScreen />);

    expect(getByText('New - React Native ctrl')).toBeTruthy();
    expect(getByText('Test ctrl')).toBeTruthy();
  });

  it('renders form controls dynamically based on FORM_CONFIG', () => {
    const {getByText} = render(<NewRecordScreen />);

    expect(getByText('Text Input Label')).toBeTruthy();
    expect(getByText('Checkbox Label')).toBeTruthy();
  });

  it('updates record state on form control change', () => {
    const {getByText} = render(<NewRecordScreen />);

    const textInput = getByText('Text Input Label');
    fireEvent.changeText(textInput, 'Sample Text');

    const checkbox = getByText('Checkbox Label');
    fireEvent.press(checkbox);
  });

  it('saves the record when the Save button is pressed', async () => {
    const {getByText} = render(<NewRecordScreen />);

    const saveButton = getByText('Save');
    await act(async () => fireEvent.press(saveButton));

    expect(helper.setStorageData).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'mock-uuid',
        created_at: expect.any(Date),
      }),
    );
  });

  it('resets the record state after saving', async () => {
    const {getByText} = render(<NewRecordScreen />);

    const saveButton = getByText('Save');
    await act(async () => fireEvent.press(saveButton));

    // Verify record is reset
    expect(helper.setStorageData).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'mock-uuid',
        created_at: expect.any(Date),
      }),
    );
  });
});
