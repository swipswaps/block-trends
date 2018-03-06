import React, { Component } from 'react';
import './App.css';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import Box from './Box';
import Parser from 'rss-parser';

const mapping = {
  US: 'p1',
  IN: 'p3',
  JP: 'p4',
  IL: 'p6',
  GB: 'p8',
  UK: 'p9',
  CA: 'p14',
  RU: 'p14',
  DE: 'p15',
  FR: 'p16',
  NL: 'p17',
  BR: 'p18',
  TR: 'p24',
  ES: 'p26',
  IT: 'p27',
  PL: 'p31',
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: 'US',
      columns: 4,
      rows: 4,
      items: []
    };

    this.onSelectFlag = this.onSelectFlag.bind(this);
  }

  randomColor() {
    const colors = ['yellow', 'red', 'green', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  fetchData(country) {
    let parser = new Parser();
    const options = `pn=${mapping[country]}`
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const TRENDS_URL = 'https://trends.google.com/trends/hottrends/atom/feed?'+options
    let items = [];

    parser.parseURL(CORS_PROXY + TRENDS_URL, (err, feed) => {
      feed.items.forEach(function(entry) {
        items.push({ title: entry.title, link: entry.link });
      })
      this.setState({ country: country, items: items });
    })
  }

  componentDidMount() {
    this.fetchData(this.state.country);
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

  onSelectFlag(countryCode) {
    this.fetchData(countryCode);
  }

  render() {
    return (
      <div className="grid">
        <ReactFlagsSelect
          onSelect={this.onSelectFlag}
          defaultCountry="US"
          countries={Object.keys(mapping)} />

        { this.state.items.map((trend, i) => this.box(trend, i)) }
      </div>
    );
  }
}

export default App;
