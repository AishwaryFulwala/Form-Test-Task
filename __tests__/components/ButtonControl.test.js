import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import ButtonControl from '../../src/components/ButtonControl';

describe('ButtonControl Component', () => {
  it('renders correctly', () => {
    const tree = render(<ButtonControl />);
    expect(tree).toBeTruthy();
  });

  it('renders with a title successfully', () => {
    const {getByText} = render(<ButtonControl title={'Click Me'} />);
    const buttonTitle = getByText('Click Me');
    expect(buttonTitle).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = {backgroundColor: 'blue'};
    const {getByTestId} = render(<ButtonControl style={customStyle} />);
    const button = getByTestId('button-control');
    expect(button.props.style).toMatchObject(customStyle);
  });

  it('calls the onPress handler when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <ButtonControl title={'Press Me'} onPress={onPressMock} />,
    );

    const button = getByTestId('button-control');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
