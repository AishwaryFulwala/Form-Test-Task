import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import SwitchControl from '../../src/components/SwitchControl';

describe('SwitchControl', () => {
  const onChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label', () => {
    const {getByText} = render(
      <SwitchControl
        id="switch"
        label="Enable Feature"
        value={false}
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    expect(getByText('Enable Feature')).toBeTruthy();
  });

  it('calls onChange when the switch value is toggled', () => {
    const {getByTestId} = render(
      <SwitchControl
        id="switch"
        label="Enable Feature"
        value={false}
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const switchControl = getByTestId('switch');
    fireEvent(switchControl, 'valueChange', true);

    expect(onChangeMock).toHaveBeenCalledWith('switch', true);
  });

  it('disables switch when readOnly is true', () => {
    const {getByTestId} = render(
      <SwitchControl
        id="switch"
        label="Enable Feature"
        value={false}
        onChange={onChangeMock}
        readOnly={true}
      />,
    );

    const switchControl = getByTestId('switch');
    expect(switchControl.props.disabled).toBe(true);
  });

  it('renders the correct thumb color based on value', () => {
    const {getByTestId} = render(
      <SwitchControl
        id="switch"
        label="Enable Feature"
        value={true}
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const switchControl = getByTestId('switch');
    expect(switchControl.props.thumbTintColor).toBe('#3A7BD6');

    const {getByRole: getByRoleFalse} = render(
      <SwitchControl
        id="switch"
        label="Enable Feature"
        value={false}
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const switchControlFalse = getByRoleFalse('switch');
    expect(switchControlFalse.props.thumbTintColor).toBe('#F4F3F4');
  });
});
