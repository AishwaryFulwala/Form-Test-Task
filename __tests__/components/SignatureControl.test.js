import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

import SignatureControl from '../../src/components/SignatureControl';

jest.useFakeTimers();

jest.mock('react-native-signature-canvas', () => {
  const {forwardRef, useEffect} = jest.requireActual('react');

  return forwardRef((mockArgs, ref) => {
    const {Text, TouchableOpacity} = jest.requireActual('react-native');

    useEffect(() => {
      ref.current.clearSignature = () => null;
      ref.current.readSignature = () => null;
    }, [mockArgs, ref]);

    return (
      <TouchableOpacity
        ref={ref}
        testID="signature-canvas"
        onPress={() => mockArgs?.onOK?.('data:image/png;base64,new-signature')}>
        <Text>Signature</Text>
      </TouchableOpacity>
    );
  });
});

describe('SignatureControl', () => {
  const onChangeMock = jest.fn();
  const setScrollEnabledMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly in read-only mode with a signature image', () => {
    const {getByTestId} = render(
      <SignatureControl
        id="signature"
        label="Signature"
        value="data:image/png;base64,some-signature"
        readOnly={true}
        onChange={onChangeMock}
        setScrollEnabled={setScrollEnabledMock}
      />,
    );

    const signatureImage = getByTestId('signature-image');
    expect(signatureImage.props.source.uri).toBe(
      'data:image/png;base64,some-signature',
    );
  });

  it('renders correctly in editable mode with the signature canvas', () => {
    const {getByTestId} = render(
      <SignatureControl
        id="signature"
        label="Signature"
        value=""
        readOnly={false}
        onChange={onChangeMock}
        setScrollEnabled={setScrollEnabledMock}
      />,
    );

    const signatureCanvas = getByTestId('signature-canvas');
    expect(signatureCanvas).toBeTruthy();
  });

  it('calls setScrollEnabled when drawing begins and ends', () => {
    const {getByTestId} = render(
      <SignatureControl
        id="signature"
        label="Signature"
        value=""
        readOnly={false}
        onChange={onChangeMock}
        setScrollEnabled={setScrollEnabledMock}
      />,
    );

    const signatureCanvas = getByTestId('signature-canvas');

    fireEvent(signatureCanvas, 'onBegin');
    expect(setScrollEnabledMock).toHaveBeenCalledWith(false);

    fireEvent(signatureCanvas, 'onEnd');
    expect(setScrollEnabledMock).toHaveBeenCalledWith(true);
  });

  it('clears the signature when the "Clear" button is pressed', () => {
    const {getByText} = render(
      <SignatureControl
        id="signature"
        label="Signature"
        value="data:image/png;base64,some-signature"
        readOnly={false}
        onChange={onChangeMock}
        setScrollEnabled={setScrollEnabledMock}
      />,
    );

    const clearButton = getByText('Clear');
    fireEvent.press(clearButton);

    expect(onChangeMock).toHaveBeenCalledWith('signature', '');
  });

  it('updates the signature value on user input', async () => {
    const {getByTestId} = render(
      <SignatureControl
        id="signature"
        label="Signature"
        value=""
        readOnly={false}
        onChange={onChangeMock}
        setScrollEnabled={setScrollEnabledMock}
      />,
    );

    const signatureCanvas = getByTestId('signature-canvas');

    fireEvent(signatureCanvas, 'onPress');
    await waitFor(
      () => {
        expect(onChangeMock).toHaveBeenCalledWith(
          'signature',
          'data:image/png;base64,new-signature',
        );
      },
      {timeout: 1000},
    );
  });

  it('does not allow editing in read-only mode', () => {
    const {queryByTestId, getByTestId} = render(
      <SignatureControl
        id="signature"
        label="Signature"
        value="data:image/png;base64,some-signature"
        readOnly={true}
        onChange={onChangeMock}
        setScrollEnabled={setScrollEnabledMock}
      />,
    );

    expect(queryByTestId('signature-canvas')).toBeNull();
    expect(getByTestId('signature-image')).toBeTruthy();
  });
});
