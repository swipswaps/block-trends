import React from 'react';
import ReactDOM from 'react-dom';
import CountrySelect from './CountrySelect';

jest.useFakeTimers();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    defaultCountry: 'US',
    countries: ['DE', 'IT', 'US'],
  }

  ReactDOM.render(<CountrySelect {...props} />, div);
  expect(setTimeout).toHaveBeenCalledTimes(0);
  ReactDOM.unmountComponentAtNode(div);
});
