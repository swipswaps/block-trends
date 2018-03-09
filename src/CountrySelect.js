import React, { Component } from 'react';

class SelectItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onItemClick(this.props.item);
  }

  flag() {
    return `flag ${this.props.item.toLowerCase()}`;
  }

  render() {
    return (
      <li onClick={this.handleClick}>
        <span className={ this.flag() } ></span>
      </li>
    );
  }
}

class CountrySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: this.props.defaultCountry
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(country) {
    this.setState({ country: country });
    this.props.onSelect(country);
  }

  flag() {
    return `flag ${this.state.country.toLowerCase()}`;
  }

  render() {
    return (
      <div className='dropdown-container'>
        <div className='dropdown-field'>
          <span className={ this.flag() } ></span>
        </div>
        <ul className='dropdown-content'>
          {
            this.props.countries.map((country) =>
              <SelectItem key={country} item={country} onItemClick={this.handleClick} />
            )
          }
        </ul>
      </div>
    );
  }
}

export default CountrySelect;
