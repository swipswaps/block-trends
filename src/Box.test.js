import React from 'react';
import ReactDOM from 'react-dom';
import Box from './Box';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.useFakeTimers();

const props = {
  key: 0,
  trend: {title: 'boxtitle', link: '#'},
  color: 'red',
  width: 100,
  height: 100,
};

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Box {...props} />, div);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders title', () => {
  configure({ adapter: new Adapter() });
  const wrapper = shallow(<Box {...props} />);
  wrapper.setState({ seconds: 0 });
  let welcome = <a href="https://www.google.com/search?q=boxtitle"><span className="typing"></span></a>;
  wrapper.setState({ seconds: 1 });
  welcome = <a href="https://www.google.com/search?q=boxtitle"><span className="typing">b</span></a>;
  wrapper.setState({ seconds: 2 });
  welcome = <a href="https://www.google.com/search?q=boxtitle"><span className="typing">bo</span></a>;
  wrapper.setState({ seconds: 3 });
  welcome = <a href="https://www.google.com/search?q=boxtitle"><span className="typing">box</span></a>;
  wrapper.setState({ seconds: 8 });
  welcome = <a href="https://www.google.com/search?q=boxtitle"><span className="full">boxtitle</span></a>;
  expect(wrapper).toContainReact(welcome)
});
