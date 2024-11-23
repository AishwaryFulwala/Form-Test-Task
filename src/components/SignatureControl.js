import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet} from 'react-native';
import Signature from 'react-native-signature-canvas';

import FormControl from './FormControl';
import {scaledSize} from '../utils/helper';
import ButtonControl from './ButtonControl';
import {COLORS, SCREEN_HEIGHT} from '../utils/constant';

const signatureWebStyle = `
  .m-signature-pad {
      height: ${SCREEN_HEIGHT / 5.5}px;
      background-color: ${COLORS.appEEEEEE};
      box-shadow: none;
      border: none;
  }
  .m-signature-pad--body {
      border: none;
  }
  .m-signature-pad--body
    canvas {
      box-shadow: none;
  }
  .m-signature-pad--footer {
      display: none; margin: 0px;
  },`;

const SignatureControl = ({
  id,
  label,
  value,
  readOnly,
  onChange,
  setScrollEnabled,
}) => {
  const signatureRef = useRef();
  const timerRef = useRef();

  useEffect(() => {
    if (!value) {
      signatureRef.current.clearSignature();
    }
  }, [value]);

  const onBegin = () => {
    setScrollEnabled(false);
  };

  const onEnd = () => {
    setScrollEnabled(true);
    signatureRef.current.readSignature();
  };

  const onClear = () => {
    signatureRef.current.clearSignature();
    onChange(id, '');
  };

  const onValueChange = sign => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => onChange(id, sign), 500);
  };

  return (
    <FormControl title={label}>
      {readOnly ? (
        <Image
          source={{uri: value}}
          style={styles.signImage}
          testID={'signature-image'}
        />
      ) : (
        <Signature
          testID={'signature-canvas'}
          ref={signatureRef}
          webStyle={signatureWebStyle}
          onOK={onValueChange}
          onBegin={onBegin}
          onEnd={onEnd}
          style={styles.signContainer}
        />
      )}
      {!readOnly && (
        <ButtonControl
          title={'Clear'}
          style={styles.clearButton}
          onPress={onClear}
        />
      )}
    </FormControl>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.appFF0000,
  },
  signContainer: {
    height: SCREEN_HEIGHT / 5.5,
    marginBottom: scaledSize(10),
  },
  signImage: {
    width: '100%',
    height: SCREEN_HEIGHT / 5.5,
    marginBottom: scaledSize(10),
    backgroundColor: COLORS.appEEEEEE,
  },
});

export default SignatureControl;
