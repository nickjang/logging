import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoggerForm from './LoggerForm';

describe(`LoggerForm component`, () => {
  it('renders LoggerForm by default', () => {
    const wrapper = shallow(<LoggerForm />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})