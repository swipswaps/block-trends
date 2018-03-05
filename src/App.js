import React, { Component } from 'react';
import './App.css';

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
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    let items = [];

    parser.parseURL(CORS_PROXY + 'https://trends.google.com/trends/hottrends/atom/feed', (err, feed) => {
      feed.items.forEach(function(entry) {
        items.push({title: entry.title, link: entry.link});
      })
      this.setState({ items: items });
    })
  }

  boxSize() {
    return {
      width: window.innerWidth / this.state.columns,
      height: window.innerHeight / this.state.rows,
      'font-size': '24px',
      'line-height': window.innerHeight / this.state.rows,
      'vertical-align': 'middle',
    }
  }

  box(trend) {
    return (
      <div className={'box '+this.randomColor()}
           key={'t'+trend.title}
           style={ this.boxSize() }>
        <a href={'https://www.google.com/search?q='+trend.title}>{trend.title}</a>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="grid">
          { this.state.items.map((trend) => this.box(trend)) }
        </div>
      </div>
    );
  }
}

export default App;
