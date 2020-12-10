import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LogList from './LogList';

describe(`LogList component`, () => {
  it('renders LogList by default', () => {
    const wrapper = shallow(<LogList />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})