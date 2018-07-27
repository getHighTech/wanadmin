import React from 'react';
import { shallow } from 'enzyme';
import { Reg } from '../../../src/features/login/Reg';

describe('login/Reg', () => {
  it('renders node with correct class name', () => {
    const props = {
      login: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Reg {...props} />
    );

    expect(
      renderedComponent.find('.login-reg').length
    ).toBe(1);
  });
});
