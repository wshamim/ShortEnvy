import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

import UrlInputForm from './UrlInputForm';
import ShortUrlResult from './ShortUrlResult';

import logo from './logo.svg';
import './MainPanel.css';

class MainPanel extends Component {
  constructor() {
    super();
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(value) {
    if (value) {
      this.props.shortenUrl(value);
    }
  }

  render() {
    const data = this.props.urls;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ShortEnvy</h1>
          <h2 className="App-sub-title">Url Shortner built with React</h2>
        </header>

        <UrlInputForm submitHandler={this.submitHandler} />

        {data.urls.msg && <Alert bsStyle="success">{data.urls.msg}</Alert>}

        {data.urls.error && <Alert bsStyle="danger">{data.urls.error}</Alert>}

        {data.urls.shortUrl && <ShortUrlResult shortUrl={data.urls.shortUrl} />}
      </div>
    );
  }
}

MainPanel.propTypes = {
  urls: PropTypes.object.isRequired,
  shortenUrl: PropTypes.func.isRequired
};

export default MainPanel;
