import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Selector from './Selector';

describe(`Selector component`, () => {
  it('renders Selector by default', () => {
    const wrapper = shallow(<Selector />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})