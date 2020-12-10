import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProjectTitles from './ProjectTitles';

describe(`ProjectTitles component`, () => {
  it('renders ProjectTitles by default', () => {
    const wrapper = shallow(<ProjectTitles />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})