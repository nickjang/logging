import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LogButton from './LogButton';

describe(`LogButton component`, () => {
  it('renders LogButton by default', () => {
    const wrapper = shallow(<LogButton />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})