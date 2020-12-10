import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddSelector from './AddSelector';

describe(`AddSelector component`, () => {
  it('renders AddSelector by default', () => {
    const wrapper = shallow(<AddSelector />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})