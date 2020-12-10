import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Start from './Start';

describe(`Start component`, () => {
  it('renders Start by default', () => {
    const wrapper = shallow(<Start />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})