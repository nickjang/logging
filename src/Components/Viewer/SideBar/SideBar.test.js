import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SideBar from './SideBar';

describe(`SideBar component`, () => {
  it('renders SideBar by default', () => {
    const wrapper = shallow(<SideBar />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})