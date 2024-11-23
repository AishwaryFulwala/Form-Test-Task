import React from 'react';
import {render, waitFor, fireEvent} from '@testing-library/react-native';

import {getStorageData} from '../../src/utils/helper';
import SaveRecordScreen from '../../src/screens/SaveRecordScreen';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
}));

jest.mock('../../src/utils/helper', () => ({
  getStorageData: jest.fn(),
  scaledSize: jest.fn(size => size),
}));

jest.mock('../../src/utils/constant', () => ({
  FORM_CONFIG: [
    {key: 'name', name: 'text', label: 'Name'},
    {key: 'age', name: 'text', label: 'Age'},
    {key: 'agree', name: 'checkbox', label: 'Agree'},
  ],
  COLORS: {
    appFFFFFF: '#FFFFFF',
    app1D2038: '#1D2038',
  },
}));

jest.mock('../../src/components', () => {
  const {Text} = jest.requireActual('react-native');

  return {
    PhotoControl: mockArgs => <Text>{mockArgs?.value}</Text>,
    SelectControl: mockArgs => <Text>{mockArgs?.value}</Text>,
    ButtonControl: mockArgs => <Text>{mockArgs.title}</Text>,
    SignatureControl: mockArgs => <Text>{mockArgs?.value}</Text>,
    DateTimeControl: mockArgs => <Text>{mockArgs?.value}</Text>,
    SwitchControl: mockArgs => <Text>{mockArgs?.value}</Text>,
    TextInputControl: mockArgs => <Text>{mockArgs?.value}</Text>,
  };
});

describe('SaveRecordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders saved records from storage', async () => {
    const mockData = [
      {name: 'John Doe', age: '30', agree: true},
      {name: 'Jane Doe', age: '25', agree: false},
    ];
    getStorageData.mockReturnValue(mockData);

    const {getByText} = render(<SaveRecordScreen />);

    await waitFor(() => {
      expect(getByText('Record No. 1')).toBeTruthy();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('30')).toBeTruthy();
    });
  });

  it('refreshes data when pulled down', async () => {
    const mockData = [{name: 'Tristan Cain', age: '30', agree: true}];
    const refreshedData = [
      {name: 'Jane Doe', age: '25', agree: false},
      {name: 'Alice Smith', age: '35', agree: true},
    ];

    getStorageData
      .mockReturnValueOnce(mockData)
      .mockReturnValueOnce(refreshedData);

    const {getByText, queryByText, getByTestId} = render(<SaveRecordScreen />);

    await waitFor(() => {
      expect(getByText('Tristan Cain')).toBeTruthy();
    });

    const flatList = getByTestId('flatlist');
    fireEvent(flatList, 'refresh');

    await waitFor(() => {
      expect(queryByText('John Doe')).toBeFalsy();
      expect(getByText('Jane Doe')).toBeTruthy();
      expect(getByText('Alice Smith')).toBeTruthy();
    });
  });

  it('renders correctly when no data is present', async () => {
    getStorageData.mockReturnValue([]);

    const {queryByText} = render(<SaveRecordScreen />);

    await waitFor(() => {
      expect(queryByText('Record No. 1')).toBeFalsy();
    });
  });
});
