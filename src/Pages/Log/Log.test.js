import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Log from './Log';

describe(`Log component`, () => {
  it('renders Log by default', () => {
    const wrapper = shallow(<Log />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})