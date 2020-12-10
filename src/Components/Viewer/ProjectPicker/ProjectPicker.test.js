import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProjectPicker from './ProjectPicker';

describe(`ProjectPicker component`, () => {
  it('renders ProjectPicker by default', () => {
    const wrapper = shallow(<ProjectPicker />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})