import React from 'react';
import ReactDOM from 'react-dom';
import CountrySelect from './CountrySelect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.useFakeTimers();

const props = {
  defaultCountry: 'US',
  countries: ['DE', 'IT', 'US'],
};

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<CountrySelect {...props} />, div);
  expect(setTimeout).toHaveBeenCalledTimes(0);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders dropdown', () => {
  configure({ adapter: new Adapter() });
  const wrapper = shallow(<CountrySelect {...props} />);
  const html = '<div class=\"dropdown-container\">\
<div class=\"dropdown-field\"><span class=\"flag us\"></span>\
</div>\
<ul class=\"dropdown-content\">\
<li><span class=\"flag de\"></span></li>\
<li><span class=\"flag it\"></span></li>\
<li><span class=\"flag us\"></span></li>\
</ul></div>';
  expect(wrapper.html()).toEqual(html)
});
