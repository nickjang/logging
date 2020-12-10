import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ExportOption from './ExportOption';

describe(`ExportOption component`, () => {
  it('renders ExportOption by default', () => {
    const wrapper = shallow(<ExportOption />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})