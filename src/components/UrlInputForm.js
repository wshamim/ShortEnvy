import React, { Component } from 'react';

export default class UrlInputForm extends Component {
  constructor() {
    super();
    this.state = { urlInput: '' };

    this.onUrlChange = this.onUrlChange.bind(this);
  }
  onUrlChange(e) {
    e.preventDefault();
    this.setState({ urlInput: e.currentTarget.value });
  }
  render() {
    return (
      <div className="row row-input-url">
        <div className="col-md-6 col-md-offset-3">
          <div className="input-group input-group-lg">
            <input
              id="url-field"
              type="text"
              onChange={this.onUrlChange}
              className="form-control"
              placeholder="Paste a Url..."
            />

            <span className="input-group-btn">
              <button
                className="btn btn-default"
                onClick={() => {
                  this.props.submitHandler(this.state.urlInput);
                }}
                type="button"
              >
                SHORT IT!
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
