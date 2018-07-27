import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/layouts/DefaultPage';

describe('layouts/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      layouts: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.layouts-default-page').length
    ).toBe(1);
  });
});
