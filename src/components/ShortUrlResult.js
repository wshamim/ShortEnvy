import React, { Component } from 'react';

export default class ShortUrlResult extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Shortened Link:</h3>
            </div>
            <div className="panel-body">
              <a href={this.props.shortUrl} className="alert-link">
                {this.props.shortUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
