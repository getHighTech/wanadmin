import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../../../src/features/layouts/Main';

describe('layouts/Main', () => {
  it('renders node with correct class name', () => {
    const props = {
      layouts: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Main {...props} />
    );

    expect(
      renderedComponent.find('.layouts-main').length
    ).toBe(1);
  });
});
