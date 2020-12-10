import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProjectSelect from './ProjectSelect';

describe(`ProjectSelect component`, () => {
  it('renders ProjectSelect by default', () => {
    const wrapper = shallow(<ProjectSelect />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})