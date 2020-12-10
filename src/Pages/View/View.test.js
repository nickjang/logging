import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import View from './View';

describe(`View component`, () => {
  it('renders View by default', () => {
    const wrapper = shallow(<View />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})