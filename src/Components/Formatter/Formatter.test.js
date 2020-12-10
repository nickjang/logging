import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Formatter from './Formatter';

describe(`Formatter component`, () => {
  it('renders Formatter by default', () => {
    const wrapper = shallow(<Formatter />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})