import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.useFakeTimers();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  expect(setTimeout).toHaveBeenCalledTimes(0);
  ReactDOM.unmountComponentAtNode(div);
});
