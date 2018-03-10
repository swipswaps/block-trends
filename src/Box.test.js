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
  wrapper.setState({ seconds: 1 });
  let link = <a href="https://www.google.com/search?q=boxtitle"><span className="typing">b</span></a>;
  expect(wrapper).toContainReact(link)
  wrapper.setState({ seconds: 2 });
  link = <a href="https://www.google.com/search?q=boxtitle"><span className="typing">bo</span></a>;
  expect(wrapper).toContainReact(link)
  wrapper.setState({ seconds: 3 });
  link = <a href="https://www.google.com/search?q=boxtitle"><span className="typing">box</span></a>;
  expect(wrapper).toContainReact(link)
  wrapper.setState({ seconds: 8 });
  link = <a href="https://www.google.com/search?q=boxtitle"><span className="full">boxtitle</span></a>;
  expect(wrapper).toContainReact(link)
});
