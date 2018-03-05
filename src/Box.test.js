import React from 'react';
import ReactDOM from 'react-dom';
import Box from './Box';

jest.useFakeTimers();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    key: 0,
    trend: {title: 'title', link: '#'},
    color: 'red',
    width: 100,
    height: 100,
  }

  ReactDOM.render(<Box {...props} />, div);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  ReactDOM.unmountComponentAtNode(div);
});
