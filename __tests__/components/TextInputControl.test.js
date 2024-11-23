import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import TextInputControl from '../../src/components/TextInputControl';

describe('TextInputControl Component', () => {
  it('renders correctly with default props', () => {
    const tree = render(
      <TextInputControl label={'Label'} value={''} onChange={() => {}} />,
    );
    expect(tree).toBeTruthy();
  });

  it('renders the label correctly', () => {
    const {getByText} = render(
      <TextInputControl label={'Label'} value={''} onChange={() => {}} />,
    );
    const labelElement = getByText('Label');
    expect(labelElement).toBeTruthy();
  });

  it('renders the value in the TextInput', () => {
    const {getByDisplayValue} = render(
      <TextInputControl
        label={'Label'}
        value={'Initial Value'}
        onChange={() => {}}
      />,
    );
    const inputElement = getByDisplayValue('Initial Value');
    expect(inputElement).toBeTruthy();
  });

  it('calls onChange when the text is updated', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <TextInputControl
        id={'test-id'}
        label={'Label'}
        value={''}
        onChange={mockOnChange}
      />,
    );
    const inputElement = getByTestId('text-input-control');

    fireEvent.changeText(inputElement, 'New Value');
    expect(mockOnChange).toHaveBeenCalledWith('test-id', 'New Value');
  });

  it('disables input when readOnly is true', () => {
    const {getByTestId} = render(
      <TextInputControl
        label={'Label'}
        value={'ReadOnly Value'}
        onChange={() => {}}
        readOnly={true}
      />,
    );
    const inputElement = getByTestId('text-input-control');
    expect(inputElement.props.editable).toBe(false);
  });
});
