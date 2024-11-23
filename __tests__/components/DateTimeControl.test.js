import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

import DateTimeControl from '../../src/components/DateTimeControl';

jest.mock('react-native-vector-icons/Ionicons', () => 'IIcon');

jest.mock('react-native-date-picker', () => mockArgs => {
  const {Text, View, TouchableOpacity} = jest.requireActual('react-native');

  return (
    mockArgs.modal && (
      <View testID="date-picker-modal">
        <TouchableOpacity
          testID="date-picker-confirm"
          onPress={() => mockArgs?.onConfirm?.(new Date())}>
          <Text>DatePicker</Text>
        </TouchableOpacity>
      </View>
    )
  );
});

describe('DateTimeControl', () => {
  const onChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and displays the label', () => {
    const {getByText} = render(
      <DateTimeControl
        id="datetime"
        label="Select Date"
        name="date"
        value="2024-11-21"
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    expect(getByText('Select Date')).toBeTruthy();
    expect(getByText('2024-11-21')).toBeTruthy();
  });

  it('opens the DatePicker modal when TouchableOpacity is pressed', async () => {
    const {getByTestId} = render(
      <DateTimeControl
        id="datetime"
        label="Select Date"
        name="date"
        value="2024-11-21"
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const dateButton = getByTestId('date-time-container');
    fireEvent.press(dateButton);

    await waitFor(() => {
      expect(getByTestId('date-picker-modal')).toBeTruthy();
    });
  });

  it('disables TouchableOpacity when readOnly is true', () => {
    const {getByTestId} = render(
      <DateTimeControl
        id="datetime"
        label="Select Date"
        name="date"
        value="2024-11-21"
        onChange={onChangeMock}
        readOnly={true}
      />,
    );

    const dateButton = getByTestId('date-time-container');
    expect(dateButton.props.accessibilityState.disabled).toBe(true);
  });

  it('calls onChange when the date is confirmed', async () => {
    const {getByTestId} = render(
      <DateTimeControl
        id="datetime"
        label="Select Date"
        name="date"
        value="2024-11-21"
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const dateButton = getByTestId('date-time-container');
    fireEvent.press(dateButton);

    fireEvent(getByTestId('date-picker-confirm'), 'press');

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith('datetime', expect.any(String));
    });
  });
});
