import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Exporter from './Exporter';

describe(`Exporter component`, () => {
  it('renders Exporter by default', () => {
    const wrapper = shallow(<Exporter />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})