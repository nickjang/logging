import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Overview from './Overview';

describe(`Overview component`, () => {
  it('renders Overview by default', () => {
    const wrapper = shallow(<Overview />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})