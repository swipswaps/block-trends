import React, { Component } from 'react';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
    };
    this.tock = this.tock.bind(this);
  }

  componentDidMount() {
    this.tick();
  }

  componentWillReceiveProps() {
    this.setState({ seconds: 0 });
  }

  tick() {
    setTimeout(this.tock, Math.random()*1000);
  }

  tock() {
    this.setState({seconds: this.state.seconds + 1});
    this.tick();
  }

  boxSize() {
    return {
      width: this.props.width,
      height: this.props.height,
      fontSize: '32px',
      lineHeight: this.props.height + 'px',
      verticalAlign: 'middle',
    }
  }

  title() {
    const length = this.props.trend.title.length;
    const result = this.props.trend.title.substring(0, this.state.seconds);
    const cssClass = (this.state.seconds < length) ? 'typing' : 'full';
    return (
      <span className={cssClass}>{result}</span>
    );
  }

  render() {
    return (
      <div key={'t'+this.props.trend.title}
           className={'box '+this.props.color }
           style={ this.boxSize() }>
        <a href={'https://www.google.com/search?q='+this.props.trend.title}>
          { this.title() }
        </a>
      </div>
    );
  }
}

export default Box;
