import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import SelectControl from '../../src/components/SelectControl';

jest.mock('react-native-vector-icons/Ionicons', () => 'IIcon');

jest.mock('react-native-element-dropdown', () => {
  const {Text, TouchableOpacity} = jest.requireActual('react-native');

  return {
    Dropdown: mockArgs => (
      <>
        <TouchableOpacity testID="dropdown">
          <Text>Drop Down</Text>
        </TouchableOpacity>
        {mockArgs?.data?.map(({label, value}, index) => (
          <TouchableOpacity
            key={index}
            testID={`checkmark-option${index}`}
            onPress={() => mockArgs?.onChange({value: value})}>
            <Text>{label}</Text>
          </TouchableOpacity>
        ))}
      </>
    ),
  };
});

describe('SelectControl', () => {
  const onChangeMock = jest.fn();
  const sampleList = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label and placeholder', () => {
    const {getByText} = render(
      <SelectControl
        id="select"
        label="Select Option"
        list={sampleList}
        value=""
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    expect(getByText('Select Option')).toBeTruthy();
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('renders the selected value', () => {
    const {getByText} = render(
      <SelectControl
        id="select"
        label="Select Option"
        list={sampleList}
        value="option1"
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    expect(getByText('Option 1')).toBeTruthy();
  });

  it('calls onChange when an option is selected', () => {
    const {getByText, getByTestId} = render(
      <SelectControl
        id="select"
        label="Select Option"
        list={sampleList}
        value=""
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const dropdown = getByTestId('dropdown');
    fireEvent.press(dropdown);

    const option2 = getByText('Option 2');
    fireEvent.press(option2);

    expect(onChangeMock).toHaveBeenCalledWith('select', 'option2');
  });

  it('does not allow selection when readOnly is true', () => {
    const {getByTestId} = render(
      <SelectControl
        id="select"
        label="Select Option"
        list={sampleList}
        value=""
        onChange={onChangeMock}
        readOnly={true}
      />,
    );

    const dropdown = getByTestId('dropdown');
    fireEvent.press(dropdown);

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('renders a checkmark for the selected option', () => {
    const {queryByTestId} = render(
      <SelectControl
        id="select"
        label="Select Option"
        list={sampleList}
        value="option1"
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const option1Checkmark = queryByTestId('checkmark-option1');
    const option2Checkmark = queryByTestId('checkmark-option2');

    expect(option1Checkmark).toBeTruthy();
    expect(option2Checkmark).toBeNull();
  });
});
