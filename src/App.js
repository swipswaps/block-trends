import React, { Component } from 'react';
import './App.css';
import Box from './Box';
import Parser from 'rss-parser';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: 4,
      rows: 4,
      items: []
    };
  }

  randomColor() {
    const colors = ['yellow', 'red', 'green', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  componentDidMount() {
    let parser = new Parser();
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const TRENDS_URL = 'https://trends.google.com/trends/hottrends/atom/feed'
    let items = [];

    parser.parseURL(CORS_PROXY + TRENDS_URL, (err, feed) => {
      feed.items.forEach(function(entry) {
        items.push({ title: entry.title, link: entry.link });
      })
      this.setState({ items: items });
    })

    setInterval(this.tick, 1000);
  }

  box(trend, index) {
    const props = {
      key: index,
      trend: trend,
      color: this.randomColor(),
      width: `${100 / this.state.columns}%`,
      height: window.innerHeight / this.state.rows,
    }
    return (
      <Box {...props} ></Box>
    );
  }

  render() {
    return (
      <div className="grid">
        { this.state.items.map((trend, i) => this.box(trend, i)) }
      </div>
    );
  }
}

export default App;
