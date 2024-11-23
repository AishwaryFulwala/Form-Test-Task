import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import PhotoControl from '../../src/components/PhotoControl';

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

jest.mock('react-native-vector-icons/Ionicons', () => 'IIcon');

describe('PhotoControl', () => {
  const onChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with no image', () => {
    const {getByText, getByTestId} = render(
      <PhotoControl
        id="photo"
        label="Upload Photo"
        value=""
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    expect(getByText('Upload Photo')).toBeTruthy();
    expect(getByTestId('camera-icon')).toBeTruthy();
  });

  it('renders correctly with an image', () => {
    const {getByTestId} = render(
      <PhotoControl
        id="photo"
        label="Upload Photo"
        value="https://example.com/photo.jpg"
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const image = getByTestId('photo-image');
    expect(image.props.source.uri).toBe('https://example.com/photo.jpg');
  });

  it('calls launchImageLibrary and updates the value on selecting an image', async () => {
    const mockImageUri = 'https://example.com/new-photo.jpg';
    launchImageLibrary.mockResolvedValue({
      assets: [{uri: mockImageUri}],
    });

    const {getByText} = render(
      <PhotoControl
        id="photo"
        label="Upload Photo"
        value=""
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const selectButton = getByText('Select Image');
    fireEvent.press(selectButton);

    await waitFor(() => {
      expect(launchImageLibrary).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalledWith('photo', mockImageUri);
    });
  });

  it('calls onChange with an empty string when the remove button is pressed', () => {
    const {getByText} = render(
      <PhotoControl
        id="photo"
        label="Upload Photo"
        value="https://example.com/photo.jpg"
        onChange={onChangeMock}
        readOnly={false}
      />,
    );

    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);

    expect(onChangeMock).toHaveBeenCalledWith('photo', '');
  });

  it('disables buttons when readOnly is true', () => {
    const {queryByText} = render(
      <PhotoControl
        id="photo"
        label="Upload Photo"
        value=""
        onChange={onChangeMock}
        readOnly={true}
      />,
    );

    expect(queryByText('Select Image')).toBeNull();
    expect(queryByText('Remove')).toBeNull();
  });
});
