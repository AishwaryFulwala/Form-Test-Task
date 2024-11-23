import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';

import FormControl from '../../src/components/FormControl';

describe('FormControl Component', () => {
  it('renders correctly', () => {
    const tree = render(<FormControl />);
    expect(tree).toBeTruthy();
  });

  it('renders the title successfully', () => {
    const {getByText} = render(<FormControl title={'Form Title'} />);
    const titleElement = getByText('Form Title');
    expect(titleElement).toBeTruthy();
  });

  it('renders children components correctly', () => {
    const {getByText} = render(
      <FormControl title={'Form Title'}>
        <Text>Child Component</Text>
      </FormControl>,
    );
    const childElement = getByText('Child Component');
    expect(childElement).toBeTruthy();
  });
});
