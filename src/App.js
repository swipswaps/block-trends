import React, { Component } from 'react';
import './flags.css';
import CountrySelect from './CountrySelect';
import Box from './Box';
import Parser from 'rss-parser';
import { colors, mapping } from './constants';

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
    return colors[Math.floor(Math.random() * colors.length)];
  }

  fetchData(country) {
    const options = `pn=${mapping[country]}`
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const TRENDS_URL = 'https://trends.google.com/trends/hottrends/atom/feed?'+options
    let items = [];

    let parser = new Parser();
    parser.parseURL(CORS_PROXY + TRENDS_URL, (err, parsed) => {
      if (!parsed) { return null; }
      parsed.items.forEach(function(entry) {
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
        <CountrySelect
          onSelect={this.onSelectFlag}
          defaultCountry="US"
          countries={Object.keys(mapping)} />

        { this.state.items.map((trend, i) => this.box(trend, i)) }
      </div>
    );
  }
}

export default App;
