import React from 'react';
import { shallow } from 'enzyme';
import { About } from '../../../src/features/home/About';

describe('home/About', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <About {...props} />
    );

    expect(
      renderedComponent.find('.home-about').length
    ).toBe(1);
  });
});
