import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CalendarPicker from './CalendarPicker';

describe(`CalendarPicker component`, () => {
  it('renders CalendarPicker by default', () => {
    const wrapper = shallow(<CalendarPicker />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})